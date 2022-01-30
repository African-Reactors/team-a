import express, { Router } from "express";
import AuthMiddleware from "../../middlewares/authMiddleware";
import productController  from "./productController";

const router: Router = express.Router();

router.get("/products",AuthMiddleware.isAuth,productController.getAllProducts);

router.get("/product/:id",AuthMiddleware.isAuth,productController.getProduct);


// router.get("/profile", authController.loadProfile); // you can add an isAuth middleware here

// router.get('/confirm/:token', authController.confirmAccount)

export default router;
