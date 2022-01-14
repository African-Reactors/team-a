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

const authController = {

  register: async (req: Request, res: Response) => {
    try {

      const { name, email, password: passwordBody } = req.body;

      if (!name || !email || !passwordBody)
        return res.status(400).json({ message: "Missing data" });

      const isUserExists = await User.findOne({ email }).exec();

      if (isUserExists)
        return res.status(401).json({ message: "User Already Exists" });

      const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);

      // 
      const access_token = crypto.randomBytes(30).toString("hex");

      const newUser = await new User({
        name,
        email,
        password,
        access_token,
      }).save();

      //jwt 

      const token = jwt.sign({ email } , 'africanReactor2022' , { expiresIn:'7d'})

      // return res.status(201).json(newUser);
      // handle email functionality here
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

      // intergrate jwt here  - Kevin 

      
      //make use of global responeHandler
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        access_token: user.access_token,
      });
    } catch (err) {
      // make use of global errorHandler 
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loadProfile: async (req: Request, res: Response) => {
    try {
      // profile  req.headers['Authori] -  req.user = user 
      // return responseHandler(res,'Profile loaded',200,req.user)
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
};

export default authController;
