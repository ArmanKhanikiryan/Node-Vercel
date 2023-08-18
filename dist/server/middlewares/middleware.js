"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Middleware {
    tokenMiddleware(req, res, next) {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({ errorMessage: "Not Authorized" });
        }
        else {
            const key = process.env.JWT_SECRET && process.env.JWT_SECRET;
            if (key) {
                jsonwebtoken_1.default.verify(token, key.toString(), (error, decoded) => {
                    if (error) {
                        res.status(403).json({ errorMessage: "Access Token is not valid" });
                    }
                    else {
                        res.setHeader('X-User', JSON.stringify(decoded));
                        next();
                    }
                });
            }
        }
    }
    validationMiddleware(req, res, next) {
        if (req.method === 'DELETE' || 'GET' || 'PATCH') {
            next();
            return;
        }
        const { name, password } = req.body;
        if (name && password) {
            next();
        }
        else {
            res.status(400).json({ errorMessage: "Invalid Credentials" });
        }
    }
}
exports.default = Middleware;
