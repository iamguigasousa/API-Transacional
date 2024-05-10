"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stocks_repository_1 = __importDefault(require("../repositories/stocks-repository"));
const stocksR = express_1.default.Router();
stocksR.post("/stocks", (req, res) => {
    const stock = req.body;
    stocks_repository_1.default.addNew(stock, (id) => {
        if (id) {
            res.status(201).location(`/stocks/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    });
});
stocksR.get("/stocks", (req, res) => {
    stocks_repository_1.default.getAllItems((stocks) => res.json(stocks));
});
stocksR.get("/stocks/:id", (req, res) => {
    const id = +req.params.id;
    stocks_repository_1.default.getById(id, (stock) => {
        if (stock) {
            res.json(stock);
        }
        else {
            res.status(404).send();
        }
    });
});
stocksR.put("/stocks/:id", (req, res) => {
    const id = +req.params.id;
    stocks_repository_1.default.update(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
stocksR.delete("/stocks/:id", (req, res) => {
    const id = +req.params.id;
    stocks_repository_1.default.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
exports.default = stocksR;
//# sourceMappingURL=stocks-router.js.map