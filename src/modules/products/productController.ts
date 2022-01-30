

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


class productController { 
    static async getAllProducts (req:Request,res:Response){
        try {
            return responseHandler(res,"Loaded",200,"loaded")
        } catch (error) {
            return errorHandler(error.message, 500, res )
        }
    }

    static async getProduct (req:Request,res:Response){
        try {
            const { id }:any = req.params.id
            return responseHandler(res,"Loaded",200,"loaded")
        } catch (error) {
            return errorHandler(error.message, 500, res )
        }
    }

}


export default productController;
