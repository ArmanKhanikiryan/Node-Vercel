import {Request, Response} from "express";
import {UserServices} from "../../services/UserService";

export interface IUser {
    name: string,
    password: string
}

export interface IUserController {
    createUser(req: Request, res: Response): Promise<void>;
    getUsers(req: Request, res: Response):Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
}
export interface IUserServices{

}