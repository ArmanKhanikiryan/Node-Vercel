import CustomError from "../error/Error";
import UserModel from "../models/UserModel";

export class UserServices{
    public async getUsers() {
        try {
            return await UserModel.find();
        }catch (e) {
            console.log('Error in getting users');
            throw new CustomError('Error Getting Users', 503);
        }
    }
    public async createUser(data:any){
        const { age, name } = data
        try {
            return await UserModel.create({ name, age });
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