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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Router_1 = __importDefault(require("./router/Router"));
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        const dbUrl = 'mongodb+srv://armankhanikiryan:93285797a@node-vercel-cluster.cpc5cyl.mongodb.net/';
        mongoose_1.default.connect(dbUrl)
            .then(() => console.log('Successfully connected to mongo'))
            .catch(err => console.log(err));
        app.use('/', Router_1.default);
        const PORT = process.env.PORT || 1234;
        app.listen(PORT, () => {
            console.log(`Server is up and working on port ${PORT}`);
        });
    });
}
exports.default = server;
