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
const responseHandler_1 = __importDefault(require("../../helpers/responseHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = __importDefault(require("../../helpers/errorHandler"));
// improvement
// class authController { 
//   static async register(req,res){
//   }
// }
const authController = {
    // registerAdmin(){
    // }
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // all crud ops are in the controller, the model is the db and db fields, the view is dependant on whether you have an api 1st design or using inbulit view handler
            const { name, email, password: passwordBody } = req.body;
            if (!name || !email || !passwordBody)
                return res.status(400).json({ message: "Missing data" });
            const isUserExists = yield User_1.default.findOne({ email }).exec();
            if (isUserExists)
                return res.status(409).json({ message: "User Already Exists" });
            const password = yield bcrypt_1.default.hash(passwordBody, bcryptConfig_1.default.salt);
            //  always salt your password before storing in db
            const access_token = crypto_1.default.randomBytes(30).toString("hex");
            yield new User_1.default({
                name,
                email,
                password,
                access_token,
            }).save();
            //jwt 
            const token = jsonwebtoken_1.default.sign({ email }, 'africanReactor2022', { expiresIn: '7d' });
            // return res.status(201).json(newUser);
            // handle email functionality here
            return (0, responseHandler_1.default)(res, 'Registration Success. Kindly check your email for an activation link', 201, token);
        }
        catch (err) {
            // return res.status(500).json({ message: "Internal Server Error" });
            return (0, errorHandler_1.default)(err.message, 500, res);
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
            // intergrate jwt here  - Kevin 
            //make use of global responeHandler
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                access_token: user.access_token,
                // isAdmin: true / false
            });
        }
        catch (err) {
            // make use of global errorHandler 
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    loadProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // profile  req.headers['Authori] -  req.user = user 
            // return responseHandler(res,'Profile loaded',200,req.user)
            const { id: _id } = req.params;
            const noSelect = ["-password", "-email", "-access_token"]; // excludes these fields from the user { }
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
    // confirmAccount: async( ) => {
    //   {token} =  req.params  
    //   jwt.verify() 
    //   load the user = user() 
    //   isActive - true() default to false 
    // }
    // requestNewActivationToken: async () => { 
    //   {email } = req.body 
    //   resend a new token ( payload : token (email, user {})) 
    // }
    // email intergrations  sendgrid / nodemailer  
    // 
};
exports.default = authController;
