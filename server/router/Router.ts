import express from "express";
import {UserController} from "../controllers/UserController";
import Middleware from "../middlewares/middleware";

const router = express.Router()
const userController = new UserController()
const { validationMiddleware, tokenMiddleware } = new Middleware()


router.post('/register', validationMiddleware, userController.register.bind(userController));

router.post('/login', validationMiddleware, userController.login.bind(userController));

// router.get('/', tokenMiddleware, userController.getUsers.bind(userController));
router.get('/', userController.getUsers.bind(userController));

router.delete('/delete/:id', userController.deleteUser.bind(userController));


export default router;