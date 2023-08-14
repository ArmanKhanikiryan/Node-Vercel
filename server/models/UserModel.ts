import mongoose, {Schema} from "mongoose";

const userModel = new Schema({
    name: String,
    age: Number,
});
const UserModel= mongoose.model('User', userModel);
export default UserModel