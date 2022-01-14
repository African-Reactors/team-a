"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./authController"));
const router = express_1.default.Router();
router.post("/register", authController_1.default.register);
router.post("/login", authController_1.default.login);
//router.post('/confirmPassword/:token', authController.confirmPassword)
router.get("/profile", authController_1.default.loadProfile);
exports.default = router;
