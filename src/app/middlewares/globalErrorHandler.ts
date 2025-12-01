import { NextFunction, Request, Response } from "express";


import mongoose from "mongoose";
import { TErrorSource } from "../interfaces/error.types";
import { handleDuplicate } from "../utils/handleDuplicate";
import { handleZodError } from "../utils/handleZodError";
import { envVars } from "../config/env";
// import mongoose from "mongoose";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);


    //  init err
    let errorSources: TErrorSource[] = [];
    let statusCode = 500;
    let message = "Something is wrong !"


    // duplicate error
    if (err.code === 11000) {
        const simplifyError = handleDuplicate(err)
        statusCode = simplifyError.statusCode;
        message = simplifyError.message
    }

    //  zod error
    else if (err.name === "ZodError") {
        const simplifyError = handleZodError(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSources = simplifyError.errorSources as TErrorSource[]
    }

    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }
        else if (err instanceof mongoose.Error.CastError) {
            statusCode = 400;
            message = `Invalid value for field "${err.path}": ${err.value}`
        }


        // Handle Mongoose ValidationError
       else if (err instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(err.errors).map((el: any) => el.message);
            statusCode = 400;
            message = "Validation Error"
            err = errors
        }

    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
};

export default globalErrorHandler