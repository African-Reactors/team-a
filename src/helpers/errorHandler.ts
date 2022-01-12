import { Request,Response} from 'express'

export default(error:any, statusCode:any, response:Response) => {
      console.log(error)
      return response.status(statusCode).json({
        success: false,
        error
      });
    }
