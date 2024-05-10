"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_router_1 = __importDefault(require("./routes/users-router"));
const PORT = 4000;
const HOSTNAME = "http://localhost";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", users_router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome!");
});
app.use((req, res) => {
    res.status(404);
});
exports.server = app.listen(PORT, () => {
    console.log(`Server running: ${HOSTNAME}:${PORT}`);
});
//# sourceMappingURL=index.js.map