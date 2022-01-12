import express, { Router } from "express";
import authController from "./authController";

const router: Router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

//router.post('/confirmPassword/:token', authController.confirmPassword)

router.get("/profile", authController.loadProfile);

export default router;
