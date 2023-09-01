import express from "express";
import {UserController} from "../controllers/UserController";
import Middleware from "../middlewares/middleware";
import Pusher from "pusher";
import Message from "../models/MessageModle";

const router = express.Router()
const userController = new UserController()
const { validationMiddleware, tokenMiddleware } = new Middleware()
if(!process.env.PUSHER_APP_ID || !process.env.PUSHER_KEY || !process.env.PUSHER_SECRET || !process.env.PUSHER_CLUSTER){
    console.log('Environmental variables are not valid')
    process.exit(1)
}
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID.toString(),
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
});

router.post('/register', validationMiddleware, userController.register.bind(userController));

router.post('/login', validationMiddleware, userController.login.bind(userController));

router.get('/', tokenMiddleware, userController.getUsers.bind(userController));

router.get('/auth', tokenMiddleware, userController.authUser.bind(userController));

router.get('/get-without',  userController.getUsers.bind(userController));

router.delete('/delete/:id', tokenMiddleware, userController.deleteUser.bind(userController));

router.get('/chat-user/:id', userController.getUserById.bind(userController))



router.post('/send-message', async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
        await newMessage.save();
        await pusher.trigger('chat', 'new_message', newMessage);
        res.status(200).json(newMessage);
    } catch (error) {
        console.error('Error saving message:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;