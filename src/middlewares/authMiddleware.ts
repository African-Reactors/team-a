import { Request, Response, NextFunction, RequestHandler} from 'express';
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm';
import User from '../database/models/User';

class AuthMiddleware { 
    static async isAuth (req:any,res:Response,next:NextFunction){
        try{
            const token = req.header('Authorization')?.replace('Bearer ','')

            const data:any = jwt.verify(token,process.env.SECRET_KEY!)


            const user = await getRepository(User).findOne({email:data?.user.email})
            if (!user){
                res.status(401).json({
                    success:false,
                    message:'Invalid token'
                })
            } else{
                req.user = user 
                req.token = token 
                next()
            }
        } catch (err){
            res.status(401).json({
                success:false,
                message:'You seem to be logged out, kindly retry again later'
            })
        }
    }
}

export default AuthMiddleware;
