import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import Message from './MessageModel.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
mongoose.connect('mongodb://localhost:27017/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(e => console.error('MongoDB connection error:', e));

const PORT = process.env.PORT || 1111;

app.use(cors());

app.use(express.json());

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
            socket.emit('new-message', newMessage);
            socket.to(receiverId).emit('new-message', newMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
