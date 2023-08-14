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
exports.UserController = void 0;
const Error_1 = __importDefault(require("../error/Error"));
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserServices();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, age } = req.body;
                const data = yield this.userService.createUser({ name, age });
                res.status(201).json({ data, message: "User Created" });
            }
            catch (e) {
                if (e instanceof Error_1.default) {
                    res.status(e.code).json({ errorMessage: e.message });
                }
                res.status(500).json({ errorMessage: 'Internal Server Error' });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.getUsers();
                res.json(result);
            }
            catch (e) {
                if (e instanceof Error_1.default) {
                    res.status(e.code).json({ errorMessage: e.message });
                }
                res.status(500).json({ errorMessage: 'Internal Server Error' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.userService.deleteUser(id);
                res.status(205).json({ message: "User Deleted" });
            }
            catch (e) {
                if (e instanceof Error_1.default) {
                    res.status(e.code).json({ errorMessage: e.message });
                }
                res.status(500).json({ errorMessage: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;