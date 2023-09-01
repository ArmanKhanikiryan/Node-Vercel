"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
function databaseConnect() {
    const dbUrl = process.env.DBURL;
    if (!dbUrl) {
        console.error('Database environment variable is not defined');
        process.exit(1);
    }
    mongoose_1.default.connect(dbUrl)
        .then(() => console.log('Successfully connected to MongoDB:'))
        .catch(e => console.log(e));
}
exports.default = databaseConnect;
