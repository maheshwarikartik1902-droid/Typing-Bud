import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from 'bcrypt';

//registration
export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isAlreadyRegistered) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        }
        );

        const refreshToken = jwt.sign({
            id: user._id
        }, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_EXPIRATION
        });

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });

        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRATION
        });



        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email
            },
            accessToken
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }

}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials username"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials password"
            });
        }

        const refreshToken = jwt.sign({
            id: user._id
        }, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_EXPIRATION
        });

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });

        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRATION
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email
            },
            accessToken
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

//server identification
export async function getMe(req, res) {
    /*try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const payload = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(payload.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ username: user.username, email: user.email });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Server error' });
    }*/
    res.status(200).json({ username: req.user.username, email: req.user.email });
}


export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized, Refresh token not found"
            });
        }

        const payload = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        });

        if (!session) {
            return res.status(401).json({
                message: "Unauthorized, Invalid refresh token"
            });
        }

        const accessToken = jwt.sign({
            id: payload.id,
            sessionId: session._id
        }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRATION
        });

        const refreshTokenNew = jwt.sign({
            id: payload.id
        }, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_EXPIRATION
        });

        const refreshTokenHashNew = crypto.createHash('sha256').update(refreshTokenNew).digest('hex');

        session.refreshTokenHash = refreshTokenHashNew;
        await session.save();

        res.cookie('refreshToken', refreshTokenNew, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });

        res.status(200).json({
            message: "Token refreshed successfully",
            accessToken
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized, Refresh token not found"
            });
        }
        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        });

        if (!session) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        session.revoked = true;
        await session.save();
        res.clearCookie('refreshToken');

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}