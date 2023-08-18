import { NextFunction, Request, Response } from "express";
import { IMiddleware, IUser} from "../utils/types/types";
import jwt from "jsonwebtoken";

export default class Middleware implements IMiddleware{
    public tokenMiddleware(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.token as string
        if (!token) {
            res.status(401).json({ errorMessage: "Not Authorized" });
        }else{
            const key= process.env.JWT_SECRET &&  process.env.JWT_SECRET
            if(key){
                jwt.verify(token, key.toString(), (error, decoded) => {
                    if (error){
                        res.status(403).json({ errorMessage: "Access Token is not valid" });
                    }else {
                        res.setHeader('X-User', JSON.stringify(decoded));
                        next()
                    }
                })
            }
        }
    }

    public validationMiddleware(req: Request, res: Response, next: NextFunction): void {
        if (req.method === 'DELETE' || 'GET' || 'PATCH'){
            next()
            return;
        }
        const { name, password }: IUser = req.body;
        if (name && password) {
            next();
        } else {
            res.status(400).json({ errorMessage: "Invalid Credentials" });
        }
    }
}