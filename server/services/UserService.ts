import CustomError from "../error/Error";
require('dotenv').config()
import UserModel from "../models/UserModel";
import {IUser, IUserDocument, IUserServices} from "../utils/types/types";
import CryptoJS from 'crypto-js'
import {Document} from "mongoose";
import jwt from 'jsonwebtoken'
export class UserServices{
    public async getUsers(id:string):Promise<Document[]> {
        try {
            return await UserModel.find({
                _id: { $ne: id },
            });
        }catch (e) {
            console.log('Error in getting users');
            throw new CustomError('Error Getting Users', 503);
        }
    }

    public async getUserById(id:string):Promise<Document | null> {
        try {
            return await UserModel.findById(id);
        }catch (e) {
            console.log('Error in getting user by id');
            throw new CustomError('Error Getting User By Id', 503);
        }
    }

    public async register(data:IUser): Promise<Document>{
        const { password, name } = data
        const existing = await UserModel.find({name})
        if (existing.length){
            throw new CustomError('User Already Existing ', 400);
        }
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
    public async login(data: IUser): Promise<IUserDocument> {
        const { password, name } = data;
        if (!process.env.PASSWORD_SECRET || !process.env.JWT_SECRET) {
            console.log('Invalid .env credentials');
            process.exit(1);
        }
        const user = await UserModel.findOne({ name });
        if (!user) {
            throw new CustomError('Wrong Credentials', 404);
        }
        try {
            const parsed = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASSWORD_SECRET.toString()
            ).toString(CryptoJS.enc.Utf8);
            if (parsed !== password) {
                throw new CustomError('Error In User Login', 504);
            }
            const accessToken = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET.toString(), { expiresIn: '3d' });
            return {
                ...user.toObject(),
                accessToken
            } as IUserDocument;
        } catch (e) {
            throw new CustomError('Error In User Login', 504);
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