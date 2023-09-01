import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';

import databaseConnect from './database/database';
import router from './router/Router';
import UserModel from "./models/UserModel";
import Message from "./models/MessageModle";
import Pusher from "pusher";

require('dotenv').config();
async function server() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    databaseConnect();
    app.use('/', router);
    const server = http.createServer(app);
    const PORT = process.env.PORT || 1234;
    server.listen(PORT, () => {
        console.log(`Server is up and working on port ${PORT}`);
    });
}

export default server;
