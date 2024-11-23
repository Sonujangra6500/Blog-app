const jwt = require("jsonwebtoken");

// middleware for token verification 

const AuthMiddleware = async (req, res, next) => {

    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "token not found " })
        }
        const verifyToken = jwt.verify(token, "exsituser");
        if (!verifyToken) {
            return res.status(400).json({ message: "token not verify" })
        }
        res.status(200)
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: "Invalid token" });
    }

};

module.exports = { AuthMiddleware };
