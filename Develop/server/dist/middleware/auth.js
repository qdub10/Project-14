import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded;
        next();
        return;
    });
};
