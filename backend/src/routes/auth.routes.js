import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
import protect from "../middlewares/auth.middleware.js";
const authRouter = Router();
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
/*
 * POST /api/auth/register
 */
authRouter.post("/register", registerValidator, validate, authController.register);

/*
 * GET /api/auth/get-me
*/
authRouter.get("/me", protect, authController.getMe);

/**
 * GET /api/auth/refresh-token
 */
authRouter.post("/refresh-token",authController.refreshToken);

/**
 * POST /api/auth/login
 */
authRouter.post("/login", loginValidator, validate, authController.login);

/*
 * GET /api/auth/logout
 */
authRouter.post("/logout", authController.logout);

export default authRouter;