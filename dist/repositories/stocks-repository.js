"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const stocksRepository = {
    addNew: (stock, callback) => {
        console.log(stock);
        const sql = "INSERT INTO stocks (acronym, name, currentValue) VALUES (?, ?)";
        const params = [stock.acronym, stock.name, stock.currentValue];
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
        const sql = "SELECT * FROM stocks WHERE id = ?";
        const params = [id];
        database_1.default.get(sql, params, (_err, row) => callback(row));
    },
    update: (id, stock, callback) => {
        const sql = "UPDATE stocks SET acronym = ?, name = ?, currentValue = ? WHERE id = ?";
        const params = [stock.acronym, stock.name, stock.currentValue, id];
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
exports.default = stocksRepository;
//# sourceMappingURL=stocks-repository.js.map