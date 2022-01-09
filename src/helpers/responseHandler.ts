import { Response } from "express"
export default (res:Response, message:any, status:any, data:any) => {
    res.status(status).send({
      message,
      data
    })
  }