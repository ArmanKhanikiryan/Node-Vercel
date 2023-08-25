"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const router = express_1.default.Router();
const userController = new UserController_1.UserController();
const { validationMiddleware, tokenMiddleware } = new middleware_1.default();
router.post('/register', validationMiddleware, userController.register.bind(userController));
router.post('/login', validationMiddleware, userController.login.bind(userController));
router.get('/', tokenMiddleware, userController.getUsers.bind(userController));
router.get('/get-without', userController.getUsers.bind(userController));
router.delete('/delete/:id', userController.deleteUser.bind(userController));
exports.default = router;
