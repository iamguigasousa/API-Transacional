"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_repository_1 = __importDefault(require("../repositories/orders-repository"));
const ordersR = express_1.default.Router();
ordersR.post("/orders", (req, res) => {
    const order = req.body;
    orders_repository_1.default.addNew(order, (id) => {
        if (id) {
            res.status(201).location(`/orders/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    });
});
ordersR.get("/orders", (req, res) => {
    orders_repository_1.default.getAllItems((orders) => res.json(orders));
});
ordersR.get("/orders/:id", (req, res) => {
    const id = +req.params.id;
    orders_repository_1.default.getById(id, (order) => {
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).send();
        }
    });
});
ordersR.put("/orders/:id", (req, res) => {
    const id = +req.params.id;
    orders_repository_1.default.update(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
ordersR.delete("/orders/:id", (req, res) => {
    const id = +req.params.id;
    orders_repository_1.default.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
exports.default = ordersR;
//# sourceMappingURL=orders-route.js.map