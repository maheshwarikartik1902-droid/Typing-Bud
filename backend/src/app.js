import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://typing-bud.vercel.app/',  // ✅ exact URL, no trailing slash
    ],
    credentials: true,      // ← required for cookies to work
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
export default app;
