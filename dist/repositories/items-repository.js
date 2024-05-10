"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const itemsRepository = {
    addNew: (item, callback) => {
        console.log(item);
        const sql = "INSERT INTO items (description, checked) VALUES (?, ?)";
        const params = [item.description, item.checked === true ? 1 : 0];
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
        const sql = "SELECT * FROM items WHERE id = ?";
        const params = [id];
        database_1.default.get(sql, params, (_err, row) => callback(row));
    },
    update: (id, item, callback) => {
        const sql = "UPDATE items SET description = ?, checked = ? WHERE id = ?";
        const params = [item.description, item.checked === true ? 1 : 0, id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM items WHERE id = ?";
        const params = [id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};
exports.default = itemsRepository;
//# sourceMappingURL=items-repository.js.map