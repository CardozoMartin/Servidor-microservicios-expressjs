import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/customError";

export const errorHandler = (err: Error, req:Request,res:Response, next:NextFunction)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({
            error:true,
            message: err.message
        })
    }

    res.status(500).json({
        error:true,
        message:'Ocurrio un error interno'
    })
}