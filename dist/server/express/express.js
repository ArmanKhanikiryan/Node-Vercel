"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importStar(require("mongoose"));
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        const dbUrl = 'mongodb+srv://armankhanikiryan:93285797a@node-vercel-cluster.cpc5cyl.mongodb.net/';
        mongoose_1.default.connect(dbUrl)
            .then(() => console.log('Successfully connected to mongo'))
            .catch(err => console.log(err));
        const userSchema = new mongoose_1.Schema({
            name: String,
            age: Number,
        });
        const UserModel = mongoose_1.default.model('User', userSchema);
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel.find();
                res.status(200).json(users);
            }
            catch (e) {
                res.status(500).json({ message: 'Error in reading database' });
            }
        }));
        app.post('/post', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, age } = req.body;
            try {
                const newUser = yield UserModel.create({ name, age });
                res.status(200).json({ message: 'user added', user: newUser });
            }
            catch (e) {
                res.status(500).json({ message: 'Error in writing database' });
            }
        }));
        app.delete('/delete/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield UserModel.deleteOne({ _id: id });
                res.status(200).json('user deleted');
            }
            catch (e) {
                res.status(500).json({ message: 'Error in deleting user' });
            }
        }));
        const PORT = 1234;
        app.listen(PORT, () => {
            console.log(`Server is up and working on port ${PORT}`);
        });
    });
}
exports.default = server;
