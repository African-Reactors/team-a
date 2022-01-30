import express, { Router } from "express";
import productController  from "./productController";

const router: Router = express.Router();

router.get("/products",productController.getAllProducts);

router.get("/product/:id",productController.getProduct);


// router.get("/profile", authController.loadProfile); // you can add an isAuth middleware here

// router.get('/confirm/:token', authController.confirmAccount)

export default router;
