import CustomError from "../error/Error";
require('dotenv').config()
import UserModel from "../models/UserModel";
import {IUser, IUserServices} from "../utils/types/types";
import CryptoJS from 'crypto-js'
import {Document} from "mongoose";
export class UserServices implements IUserServices{
    public async getUsers():Promise<Document> {
        try {
            return await UserModel.find();
        }catch (e) {
            console.log('Error in getting users');
            throw new CustomError('Error Getting Users', 503);
        }
    }
    public async createUser(data:IUser){
        const { password, name } = data
        try {
            if (!process.env.PASSWORD_SECRET){
                console.log('Invalid .env credentials')
                process.exit(1)
            }
            return await UserModel.create({ name, password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET.toString())});
        }catch (e) {
            console.log('Error in creating user');
            throw new CustomError('Error In User Creation ', 504);
        }
    }
    public async deleteUser(_id: string): Promise<void> {
        try {
            await UserModel.deleteOne({ _id });
        } catch (e) {
            console.log('Error in deleting users', e);
            throw new CustomError('Error In Deleting User', 505);
        }
    }
}