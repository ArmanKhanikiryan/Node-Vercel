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
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, name } = data;
            try {
                return yield UserModel_1.default.create({ name, password: crypto_js_1.default.HmacSHA256(password, "YARDAGES") });
            }
            catch (e) {
                console.log('Error in creating user');
                throw new Error_1.default('Error In User Creation ', 504);
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
