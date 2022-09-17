"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/ads", (req, res) => {
    return res.json([
        { id: 1, name: "isaac" },
        { id: 2, name: "isaac1" }
    ]);
});
app.listen(3333, () => console.log("rodando"));
