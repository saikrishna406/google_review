const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const supabase = require('../config/supabase');

exports.getSubscription = async (req, res) => {
    try {
        const user_id = req.user.id;

        // 1. Check if user exists in our DB (profiles or subscriptions table)
        // For MVP, lets assume we store stripe_customer_id in profiles
        const { data: profile } = await supabase.from('profiles').select('stripe_customer_id, subscription_status, subscription_tier').eq('id', user_id).single();

        if (!profile) {
            return res.json({ tier: 'Free', status: 'active', usage: 0, limit: 10 });
        }

        // 2. Fetch from Stripe if needed (or rely on cached webhook data in DB)
        // For real-time accuracy, let's fetch usage or status from DB which should be updated via webhooks.

        // Mock usage calculation from review_requests
        const { count } = await supabase.from('review_requests').select('*', { count: 'exact', head: true }).eq('business_id', req.user.business_id); // Assuming business_id link

        res.json({
            tier: profile?.subscription_tier || 'Free',
            status: profile?.subscription_status || 'inactive',
            usage: count || 0,
            limit: profile?.subscription_tier === 'Growth Pro' ? 1000 : 50,
            invoices: [] // Fetch invoices from Stripe API if needed: await stripe.invoices.list({ customer: profile.stripe_customer_id })
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching subscription' });
    }
};

exports.createCheckoutSession = async (req, res) => {
    try {
        const { priceId } = req.body;
        const user_id = req.user.id;
        const user_email = req.user.email;

        // Get or Create Stripe Customer
        let { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user_id).single();
        let customerId = profile?.stripe_customer_id;

        if (!customerId) {
            const customer = await stripe.customers.create({ email: user_email, metadata: { supabase_id: user_id } });
            customerId = customer.id;
            await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user_id);
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: customerId,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `http://localhost:3000/dashboard/billing?success=true`,
            cancel_url: `http://localhost:3000/dashboard/billing?canceled=true`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating checkout session' });
    }
};
