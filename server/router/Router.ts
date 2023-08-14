import express from "express";
import {UserController} from "../controllers/UserController";

const router = express.Router()
const userController = new UserController()

router.get('/', userController.getUsers.bind(userController));

router.post('/post', userController.createUser.bind(userController));

router.post('/register', userController.createUser.bind(userController));

router.post('/post', userController.createUser.bind(userController));

router.delete('/delete/:id', userController.deleteUser.bind(userController));


export default router;