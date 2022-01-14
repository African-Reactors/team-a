"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../database/models/User"));
//import errorHandler from "../../helpers/errorHandler";
//import responseHandler from "../../helpers/responseHandler";
const bcryptConfig_1 = __importDefault(require("../auth/bcryptConfig"));
const authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password: passwordBody } = req.body;
            if (!name || !email || !passwordBody)
                return res.status(400).json({ message: "Missing data" });
            const isUserExists = yield User_1.default.findOne({ email }).exec();
            if (isUserExists)
                return res.status(401).json({ message: "User Already Exists" });
            const password = yield bcrypt_1.default.hash(passwordBody, bcryptConfig_1.default.salt);
            const access_token = crypto_1.default.randomBytes(30).toString("hex");
            const newUser = yield new User_1.default({
                name,
                email,
                password,
                access_token,
            }).save();
            return res.status(201).json(newUser);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Missing Email or Password" });
            const user = yield User_1.default.findOne({ email }).exec();
            if (!user)
                return res.status(401).json({ message: "User does not Exist!" });
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                return res.status(401).json({ message: "Password is Wrong!" });
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                access_token: user.access_token,
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    loadProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: _id } = req.params;
            const noSelect = ["-password", "-email", "-access_token"];
            if (_id) {
                const user = yield User_1.default.findOne({ _id }, noSelect).exec();
                return res.status(200).json(user);
            }
            else {
                const users = yield User_1.default.find({}, noSelect).exec();
                return res.status(200).json(users);
            }
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
};
exports.default = authController;
