import mongoose, {Schema} from "mongoose";

const userModel = new Schema({
    name: String,
    password: String
});
const UserModel= mongoose.model('User', userModel);
export default UserModel