import { Request, Response } from 'express';
import CustomError from "../error/Error";
import {UserServices} from "../services/UserService";
import {IUserController} from "../utils/types/types";
import {Document} from "mongoose";

export class UserController implements IUserController{
    private userService: UserServices
    constructor() {
        this.userService = new UserServices()
    }
    public async register(req: Request, res: Response): Promise<void> {
        try{
            const { name, password } = req.body;
            const data = await this.userService.register({ name, password })
            res.status(200).json({ data, message: "User Created" });
        }catch (e) {
            if (e instanceof CustomError) {
                res.status(e.code).json({ errorMessage: e.message });
            } else {
                throw e;
            }
        }
    }

    public async getUsers(req: Request, res: Response):Promise<void> {
        // const userData = JSON.parse(res.getHeader('X-User') as string);
        try {
            const result:Document[] = await this.userService.getUsers()
            res.status(200).json(result)
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.userService.deleteUser(id)
            res.status(200).json({ message: "User Deleted" });
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const {name, password} = req.body
            const data = await this.userService.login({name, password})
            res.status(200).json({data, message: "Logged In"});
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }
}