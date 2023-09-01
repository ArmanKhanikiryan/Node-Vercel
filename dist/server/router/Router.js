"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const pusher_1 = __importDefault(require("pusher"));
const MessageModle_1 = __importDefault(require("../models/MessageModle"));
const router = express_1.default.Router();
const userController = new UserController_1.UserController();
const { validationMiddleware, tokenMiddleware } = new middleware_1.default();
if (!process.env.PUSHER_APP_ID || !process.env.PUSHER_KEY || !process.env.PUSHER_SECRET || !process.env.PUSHER_CLUSTER) {
    console.log('Environmental variables are not valid');
    process.exit(1);
}
const pusher = new pusher_1.default({
    appId: process.env.PUSHER_APP_ID.toString(),
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
});
router.post('/register', validationMiddleware, userController.register.bind(userController));
router.post('/login', validationMiddleware, userController.login.bind(userController));
router.get('/', tokenMiddleware, userController.getUsers.bind(userController));
router.get('/auth', tokenMiddleware, userController.authUser.bind(userController));
router.get('/get-without', userController.getUsers.bind(userController));
router.delete('/delete/:id', tokenMiddleware, userController.deleteUser.bind(userController));
router.get('/chat-user/:id', userController.getUserById.bind(userController));
// router.post('/send-message', async (req, res) => {
//     const { senderId, receiverId, content } = req.body;
//     try {
//         const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
//         await newMessage.save();
//         await pusher.trigger('chat', 'new_message', newMessage);
//         res.status(200).json(newMessage);
//     } catch (error) {
//         console.error('Error saving message:');
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.get('/message-history/:senderId/:receiverId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId } = req.params;
    try {
        const history = yield MessageModle_1.default.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        }).sort('createdAt');
        res.status(200).json(history);
    }
    catch (error) {
        console.error('Error fetching message history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/send-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, content } = req.body;
    try {
        const newMessage = new MessageModle_1.default({ sender: senderId, receiver: receiverId, content });
        yield newMessage.save();
        yield pusher.trigger(`chat-${senderId}-${receiverId}`, 'new_message', newMessage);
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
