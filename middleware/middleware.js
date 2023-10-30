const jwt = require('jsonwebtoken');
const config = process.env;
const vertifyToken = (req, res, next) => {

    // const token = req.body.token || req.query.token || req.headers.authorization;
    const token = req.body.token
    // const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send("A token is required for sign in!");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        return next();
    } catch {
        
        return res.status(401).send("Invalid Token");
    }
    
}
module.exports = vertifyToken;



