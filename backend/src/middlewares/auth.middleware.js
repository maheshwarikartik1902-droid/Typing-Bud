import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js";
// auth.middleware.js
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const payload = jwt.verify(token, config.JWT_SECRET);
        
        // verify session is still active
        const session = await sessionModel.findById(payload.sessionId);
        if (!session || session.revoked) {
            return res.status(401).json({ message: 'Session expired' });
        }

        req.user = await userModel.findById(payload.id);
        req.session = session;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(401).json({ message: 'Invalid token' , error: err.message});
    }
};

export default protect;