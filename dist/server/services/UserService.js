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
exports.UserServices = void 0;
const Error_1 = __importDefault(require("../error/Error"));
require('dotenv').config();
const UserModel_1 = __importDefault(require("../models/UserModel"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.find();
            }
            catch (e) {
                console.log('Error in getting users');
                throw new Error_1.default('Error Getting Users', 503);
            }
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, name } = data;
            const existing = yield UserModel_1.default.find({ name });
            if (existing.length) {
                throw new Error_1.default('User Already Existing ', 400);
            }
            try {
                if (!process.env.PASSWORD_SECRET) {
                    console.log('Invalid .env credentials');
                    process.exit(1);
                }
                return yield UserModel_1.default.create({ name, password: crypto_js_1.default.AES.encrypt(password, process.env.PASSWORD_SECRET.toString()) });
            }
            catch (e) {
                console.log('Error in creating user');
                throw new Error_1.default('Error In User Creation ', 504);
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, name } = data;
            if (!process.env.PASSWORD_SECRET || !process.env.JWT_SECRET) {
                console.log('Invalid .env credentials');
                process.exit(1);
            }
            const user = yield UserModel_1.default.findOne({ name });
            if (!user) {
                throw new Error_1.default('Wrong Credentials', 404);
            }
            try {
                const parsed = crypto_js_1.default.AES.decrypt(user.password, process.env.PASSWORD_SECRET.toString()).toString(crypto_js_1.default.enc.Utf8);
                if (parsed !== password) {
                    throw new Error_1.default('Error In User Login', 504);
                }
                const accessToken = jsonwebtoken_1.default.sign({
                    id: user._id
                }, process.env.JWT_SECRET.toString(), { expiresIn: '1d' });
                return Object.assign(Object.assign({}, user.toObject()), { accessToken });
            }
            catch (e) {
                throw new Error_1.default('Error In User Login', 504);
            }
        });
    }
    deleteUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserModel_1.default.deleteOne({ _id });
            }
            catch (e) {
                console.log('Error in deleting users', e);
                throw new Error_1.default('Error In Deleting User', 505);
            }
        });
    }
}
exports.UserServices = UserServices;
