const supabase = require('../config/supabase');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        // 1. Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            return res.status(400).json({ success: false, message: authError.message });
        }

        const user = authData.user;

        if (user) {
            // 2. Create Profile entry
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: user.id, email, full_name: name }]);

            if (profileError) {
                console.error('Profile creation error:', profileError);
                // Continue anyway as auth account is created
            }
        }

        res.status(201).json({ success: true, user, token: authData.session?.access_token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ success: false, message: error.message });
        }

        // Fetch profile name extra
        let user = data.user;
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (profile) user.name = profile.full_name;

        res.json({ success: true, user, token: data.session.access_token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

exports.verify = async (req, res) => {
    // Middleware should handle this, but if endpoint is called directly:
    const token = req.headers['x-access-token'] || req.body.token;
    if (!token) return res.status(403).json({ success: false, message: 'No token' });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    res.json({ success: true, user });
};
