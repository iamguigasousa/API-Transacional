"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_repository_1 = __importDefault(require("../repositories/users-repository"));
const usersR = express_1.default.Router();
usersR.post("/user", (req, res) => {
    const user = req.body;
    users_repository_1.default.addNew(user, (id) => {
        if (id) {
            res.status(201).location(`/user/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    });
});
usersR.get("/user", (req, res) => {
    users_repository_1.default.getAllItems((itens) => res.json(itens));
});
usersR.get("/user/:id", (req, res) => {
    const id = +req.params.id;
    users_repository_1.default.getById(id, (user) => {
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    });
});
usersR.put("/user/:id", (req, res) => {
    const id = +req.params.id;
    users_repository_1.default.update(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
usersR.delete("/user/:id", (req, res) => {
    const id = +req.params.id;
    users_repository_1.default.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
exports.default = usersR;
//# sourceMappingURL=users-router.js.map