import {  Request, Response} from 'express'
import errorHandler from '../../helpers/errorHandler'
import responseHandler from '../../helpers/responseHandler'

class authController { 

    static async register(req:Request,res:Response){
        try{

            return responseHandler(res,"Loaded successfully",201,'User login success')
        } catch(error:any){
            return errorHandler(error!.message,500,res)
        }
        // return res.status(201).json({"data":"Added user successfully"})
    }

    static async login(req:Request,res:Response){
        return res.status(200).json({"data":"Login user successfully"})
    }

    static async confirmPassword(req:Request,res:Response){
        return res.status(200).json({"data":"Added user successfully"})
    }

    static async resetPassword(req:Request,res:Response){
        return res.status(200).json({"data":"Added user successfully"})
    }

    static async loadProfile(req:Request,res:Response){
        return res.status(200).json({"data":"load user successfully"})
    }

}

export default authController;

