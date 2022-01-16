"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./authController"));
const router = express_1.default.Router();
router.post("/register", authController_1.default.register);
router.post("/login", authController_1.default.login); // no middlewares on login / register 
//router.post('/confirmPassword/:token', authController.confirmPassword)
// /confirmAccount/fhfjfjfjfkfkfkfk
router.get("/profile", authController_1.default.loadProfile); // you can add an isAuth middleware here
exports.default = router;
