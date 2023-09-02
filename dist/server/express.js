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
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const database_1 = __importDefault(require("./database/database"));
const Router_1 = __importDefault(require("./router/Router"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const MessageModle_1 = __importDefault(require("./models/MessageModle"));
require('dotenv').config();
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        (0, database_1.default)();
        app.use('/', Router_1.default);
        const server = http_1.default.createServer(app);
        const io = new socket_io_1.default.Server(server, { cors: { origin: '*' } });
        io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('join_room', (userId) => {
                // Join a room based on the user's ID
                socket.join(userId);
            });
            socket.on('chat_message', ({ senderId, receiverId, content }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const sender = yield UserModel_1.default.findById(senderId);
                    const receiver = yield UserModel_1.default.findById(receiverId);
                    if (!sender || !receiver) {
                        console.error('Sender or receiver not found');
                        return;
                    }
                    const newMessage = new MessageModle_1.default({ sender, receiver, content });
                    yield newMessage.save();
                    // Emit the new message to the sender's room
                    io.to(senderId).emit('new_message', newMessage);
                    // Emit the new message to the receiver's room
                    io.to(receiverId).emit('new_message', newMessage);
                }
                catch (error) {
                    console.error('Error saving message:', error);
                }
            }));
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });
        const PORT = process.env.PORT || 1234;
        server.listen(PORT, () => {
            console.log(`Server is up and working on port ${PORT}`);
        });
    });
}
// server();
exports.default = server;
