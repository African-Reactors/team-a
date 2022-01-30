import express, { Router } from "express";
import AuthMiddleware from "../../middlewares/authMiddleware";
import authController from "./authController";

const router: Router = express.Router();

router.post("/register",authController.register);

router.post("/login", authController.login); // no middlewares on login / register 

router.get("/profile", AuthMiddleware.isAuth ,authController.loadProfile); // you can add an isAuth middleware here

router.get('/confirm/:token', authController.confirmAccount)

export default router;
