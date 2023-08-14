import { Request, Response } from 'express';
import CustomError from "../error/Error";
import {UserServices} from "../services/UserService";

export class UserController{
    private userService: UserServices
    constructor() {
        this.userService = new UserServices()
    }
    public async createUser(req: Request, res: Response): Promise<void> {
        try{
            const { name, age } = req.body;
            const data = await this.userService.createUser({ name, age })
            res.status(201).json({ data, message: "User Created" });
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }

    public async getUsers(req: Request, res: Response):Promise<void> {
        try {
            const result = await this.userService.getUsers()
            res.json(result)
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
            res.status(201).json({ message: "User Deleted" });
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }
}