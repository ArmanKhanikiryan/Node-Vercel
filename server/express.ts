import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';

import databaseConnect from './database/database';
import router from './router/Router';
import UserModel from "./models/UserModel";
import Message from "./models/MessageModle";

require('dotenv').config();

async function server() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    databaseConnect();

    app.use('/', router);

    const server = http.createServer(app);
    const io = new socketIo.Server(server, {cors: {origin: "*"}});

    io.on('connection', (socket) => {
        socket.on('chat_message', async ({ senderId, receiverId, content }) => {
            try {
                const sender = await UserModel.findById(senderId);
                const receiver = await UserModel.findById(receiverId);
                if (!sender || !receiver) {
                    console.error('Sender or receiver not found');
                    return;
                }
                const newMessage = new Message({ sender, receiver, content });
                await newMessage.save();
                socket.emit('new_message', newMessage);
                socket.to(receiverId).emit('new_message', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

    });

    const PORT = process.env.PORT || 1234;
    server.listen(PORT, () => {
        console.log(`Server is up and working on port ${PORT}`);
    });
}

export default server;
