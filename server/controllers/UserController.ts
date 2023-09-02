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
        try {
            const { id } = req.params
            const result:Document[] = await this.userService.getUsers(id)
            res.status(200).json(result)
        }catch (e) {
            if (e instanceof CustomError){
                res.status(e.code).json({ errorMessage: e.message})
                return;
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }
    public async authUser(_: Request, res: Response):Promise<void> {
        const userData = JSON.parse(res.getHeader('X-User') as string);
        try {
            const result:Document | null= await this.userService.getUserById(userData.id)
            if (!result){
                res.status(404).json({ errorMessage: 'User Not Found' });
                return;
            }
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

    public async getUserById(req: Request, res: Response):Promise<void>{
        try {
            const id: string = req.params.id;
            const user = await this.userService.getUserById(id)
            if (!user){
                res.status(404).json({ errorMessage: 'User Not Found' });
                return;
            }
            res.status(200).json(user)
        }catch(err){

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
                return
            }
            res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
    }
}