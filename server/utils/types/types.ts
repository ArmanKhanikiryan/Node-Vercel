import {NextFunction, Request, Response} from "express";
import {Document} from "mongoose";
import {JwtPayload} from "jsonwebtoken";

export interface IUser {
    name: string,
    password: string
}

export interface IUserController {
    register(req: Request, res: Response): Promise<void>;
    getUsers(req: Request, res: Response):Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
}
export interface IUserServices{
    createUser(data:IUser): Promise<Document>;
    deleteUser(_id: string): Promise<void>;
    getUsers():Promise<Document[]>
}

export interface IMiddleware {
    tokenMiddleware(req: Request, res: Response, next: NextFunction): void
    validationMiddleware(req: Request, res: Response, next: NextFunction): void
}

export interface IUserDocument extends Document, IUser {
    accessToken: string;
}










