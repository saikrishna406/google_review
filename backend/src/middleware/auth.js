const supabase = require('../config/supabase');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ success: false, message: 'A token is required for authentication' });
    }

    try {
        const bearer = token.replace(/^Bearer\s+/, "");

        // Verify with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(bearer);

        if (error || !user) {
            throw new Error('Invalid token');
        }
        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({ success: false, message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
