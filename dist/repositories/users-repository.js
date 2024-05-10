"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const usersRepository = {
    addNew: (user, callback) => {
        console.log(user);
        const sql = "INSERT INTO users (name, cpf) VALUES (?, ?)";
        const params = [user.name, user.cpf];
        database_1.default.run(sql, params, function (_err) {
            callback(this === null || this === void 0 ? void 0 : this.lastID);
        });
    },
    getAllItems: (callback) => {
        const sql = "SELECT * FROM users";
        const params = [];
        database_1.default.all(sql, params, (_err, rows) => callback(rows));
    },
    getById: (id, callback) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        const params = [id];
        database_1.default.get(sql, params, (_err, row) => callback(row));
    },
    update: (id, user, callback) => {
        const sql = "UPDATE users SET name = ?, cpf = ? WHERE id = ?";
        const params = [user.name, user.cpf, id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM users WHERE id = ?";
        const params = [id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};
exports.default = usersRepository;
//# sourceMappingURL=users-repository.js.map