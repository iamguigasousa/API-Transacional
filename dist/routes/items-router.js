"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_repository_1 = __importDefault(require("../repositories/items-repository"));
const itemsR = express_1.default.Router();
itemsR.post("/items", (req, res) => {
    const item = req.body;
    items_repository_1.default.addNew(item, (id) => {
        if (id) {
            res.status(201).location(`/items/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    });
});
itemsR.get("/items", (req, res) => {
    items_repository_1.default.getAllItems((itens) => res.json(itens));
});
itemsR.get("/items/:id", (req, res) => {
    const id = +req.params.id;
    items_repository_1.default.getById(id, (item) => {
        if (item) {
            res.json(item);
        }
        else {
            res.status(404).send();
        }
    });
});
itemsR.put("/items/:id", (req, res) => {
    const id = +req.params.id;
    items_repository_1.default.update(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
itemsR.delete("/items/:id", (req, res) => {
    const id = +req.params.id;
    items_repository_1.default.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
exports.default = itemsR;
//# sourceMappingURL=items-router.js.map