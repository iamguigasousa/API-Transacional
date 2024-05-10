"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const ordersRepository = {
    addNew: (order, callback) => {
        console.log(order);
        const sql = "INSERT INTO orders (id, dateTime, quantity, totalValue, stockName, executed) VALUES (?, ?)";
        const params = [order.id, order.dateTime, order.quantity, order.totalValue, order.stockName, order.executed === true ? 1 : 0];
        database_1.default.run(sql, params, function (_err) {
            callback(this === null || this === void 0 ? void 0 : this.lastID);
        });
    },
    getAllItems: (callback) => {
        const sql = "SELECT * FROM items";
        const params = [];
        database_1.default.all(sql, params, (_err, rows) => callback(rows));
    },
    getById: (id, callback) => {
        const sql = "SELECT * FROM orders WHERE id = ?";
        const params = [id];
        database_1.default.get(sql, params, (_err, row) => callback(row));
    },
    update: (id, order, callback) => {
        const sql = "UPDATE orders SET dateTime = ?, quantity = ?, totalValue = ?, stockName = ?, executed = ? WHERE id = ?";
        const params = [order.dateTime, order.quantity, order.totalValue, order.stockName, order.executed === true ? 1 : 0, id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM stocks WHERE id = ?";
        const params = [id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};
exports.default = ordersRepository;
//# sourceMappingURL=orders-repository.js.map