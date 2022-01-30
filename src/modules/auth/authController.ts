import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import User from "../../database/models/User";
//import errorHandler from "../../helpers/errorHandler";
//import responseHandler from "../../helpers/responseHandler";
import bcryptConfig from "../auth/bcryptConfig";
import responseHandler from "../../helpers/responseHandler";
import jwt from 'jsonwebtoken'; 
import errorHandler from "../../helpers/errorHandler";
import { IUser } from "../../helpers/common/types/User";
import SendGridHelper from "../../helpers/sendGridHelper";


// improvement
// class authController { 

//   static async register(req,res){

//   }
// }

const authController = {
  // registerAdmin(){

  // }
  register: async (req: Request, res: Response) => {
    try {
      // all crud ops are in the controller, the model is the db and db fields, the view is dependant on whether you have an api 1st design or using inbulit view handler
      const { name, email, password: passwordBody }  = req.body;

      if (!name || !email || !passwordBody)
        return res.status(400).json({ message: "Missing data" });

      const isUserExists = await User.findOne({ email }).exec();

      if (isUserExists)
        return res.status(409).json({ message: "User Already Exists" });

      const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);

      //  always salt your password before storing in db

      const access_token = crypto.randomBytes(30).toString("hex");

       await new User({
        name,
        email,
        password,
        access_token,
      }).save();

      //jwt 

      // email-intergrations 
      const token = jwt.sign({ email } , 'africanReactor2022' , { expiresIn:'7d'})

      await SendGridHelper.sendConfirmationMail(token,email);

      return responseHandler(res, 'Registration Success. Kindly check your email for an activation link', 201,token );
    } catch (err:any) {
      // return res.status(500).json({ message: "Internal Server Error" });
      return errorHandler(err!.message, 500,res);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Missing Email or Password" });

      const user = await User.findOne({ email }).exec();

      if (!user)
        return res.status(401).json({ message: "User does not Exist!" });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(401).json({ message: "Password is Wrong!" });

      if (!user.isActive){ 
        return res.status(401).json({ message: "Activate your account to login" });
      }

      // intergrate jwt here  - Kevin 
      const token = jwt.sign({ email } , 'africanReactor2022' , { expiresIn:'7d'})      
      //make use of global responeHandler
      return res.status(200).json({
        token
        // isAdmin: true / false
      });
    } catch (err) {
      // make use of global errorHandler 
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loadProfile: async (req: Request, res: Response) => {
    try {
      const { id: _id } = req.params;
      const noSelect = ["-password", "-email", "-access_token"]; // excludes these fields from the user { }
      if (_id) {
        const user = await User.findOne({ _id }, noSelect).exec();
        return res.status(200).json(user);
      } else {
        const users = await User.find({}, noSelect).exec();
        return res.status(200).json(users);
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  
  confirmAccount: async(  req:Request, res:Response ) => {
    try {
      const { token } = req.params;
      const isValidToken:any =  jwt.verify(token, 'africanReactor2022' )
      console.log(isValidToken); 
      const user = await User.findOne({ email: isValidToken?.email }).exec();
      user.isActive =  true 
      user.save()
      return responseHandler(res,"Account confirmation successful",200,user)

      // return responseHandler(res, 'Registration Success. Kindly check your email for an activation link', 201,token );
    } catch (error) {
      return errorHandler(error.message, 500, res )
    }
  }
};

export default authController;
