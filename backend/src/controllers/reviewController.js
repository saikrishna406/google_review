const supabase = require('../config/supabase');

exports.sendRequest = async (req, res) => {
    try {
        const { business_id, customer_name, customer_phone } = req.body;

        // 1. Create/Find Customer (Upsert logic or simple check)
        // For MVP, just insert. Optimization: Check exists first.
        let customer_id;
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id')
            .eq('phone', customer_phone)
            .eq('business_id', business_id)
            .single();

        if (existingCustomer) {
            customer_id = existingCustomer.id;
        } else {
            const { data: newCustomer, error: createError } = await supabase
                .from('customers')
                .insert([{ business_id, name: customer_name, phone: customer_phone }])
                .select()
                .single();
            if (createError) throw createError;
            customer_id = newCustomer.id;
        }

        // 2. Create Review Request
        const { data: request, error: reqError } = await supabase
            .from('review_requests')
            .insert([{ business_id, customer_id, status: 'sent' }])
            .select()
            .single();

        if (reqError) throw reqError;

        // 3. Mock WhatsApp
        console.log(`[WhatsApp] Sending to ${customer_phone}: "Hi ${customer_name}, please rate us at http://localhost:5173/rate/${business_id}?rid=${request.id}"`);

        res.json({ success: true, message: 'Review request sent', request_id: request.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error sending request' });
    }
};

exports.getRequests = async (req, res) => {
    try {
        // Get requests for the user's business
        // 1. Get User's Business ID
        const { data: business } = await supabase.from('businesses').select('id').eq('owner_id', req.user.id).single();

        if (!business) return res.json({ requests: [] });

        // 2. Fetch requests
        const { data: requests, error } = await supabase
            .from('review_requests')
            .select('*, customers(name, phone)') // join customers
            .eq('business_id', business.id)
            .order('sent_at', { ascending: false });

        if (error) throw error;

        // Flatten structure for frontend convenience if needed, or send as is
        res.json({ requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching requests' });
    }
};

exports.getRatingPage = async (req, res) => {
    try {
        const { business_id } = req.params;
        const { data: business, error } = await supabase.from('businesses').select('*').eq('id', business_id).single();

        if (error || !business) return res.status(404).json({ message: 'Business not found' });

        res.json({ business_name: business.name, google_review_url: business.google_review_url });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitRating = async (req, res) => {
    try {
        const { business_id } = req.params;
        const { stars, request_id } = req.body;

        const { data: event, error } = await supabase
            .from('rating_events')
            .insert([{
                review_request_id: request_id || null,
                stars: parseInt(stars),
                redirected_to_google: parseInt(stars) === 5
            }])
            .select()
            .single();

        if (error) throw error;

        const { data: business } = await supabase.from('businesses').select('google_review_url').eq('id', business_id).single();

        if (event.stars === 5) {
            res.json({ redirect: true, url: business?.google_review_url || 'https://maps.google.com' });
        } else {
            res.json({ redirect: false, feedback_form: true, rating_event_id: event.id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error submitting rating' });
    }
};

exports.submitFeedback = async (req, res) => {
    try {
        const { rating_event_id, message, contact_optional } = req.body;

        const { error } = await supabase
            .from('feedback')
            .insert([{ rating_event_id, message, contact_info: contact_optional }]);

        if (error) throw error;

        res.json({ success: true, message: 'Feedback received' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error submitting feedback' });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        // Complex join to get feedback for user's business
        // For MVP: Fetch business -> Fetch requests -> Fetch ratings -> Fetch feedback

        const user_id = req.user.id;
        // 1. Get Business
        const { data: business } = await supabase.from('businesses').select('id').eq('owner_id', user_id).single();
        if (!business) return res.json({ feedback: [] });

        // 2. Get Requests
        const { data: requests } = await supabase.from('review_requests').select('id').eq('business_id', business.id);
        const requestIds = requests.map(r => r.id);
        if (requestIds.length === 0) return res.json({ feedback: [] });

        // 3. Get Ratings
        const { data: ratings } = await supabase.from('rating_events').select('id').in('review_request_id', requestIds);
        const ratingIds = ratings.map(r => r.id);
        if (ratingIds.length === 0) return res.json({ feedback: [] });

        // 4. Get Feedback
        const { data: feedback, error } = await supabase.from('feedback').select('*').in('rating_event_id', ratingIds);

        if (error) throw error;
        res.json({ feedback });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};
