import mongoose, {Schema} from "mongoose";

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const UserModel= mongoose.model('User', userModel);
export default UserModel