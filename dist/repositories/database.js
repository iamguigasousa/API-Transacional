"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const DBSOURCE = "db.sqlite";
const DDL_SCRIPT = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cpf INTEGER
    )
    CREATE TABLE stocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        acronym TEXT,
        name TEXT,
        currentValue INTEGER
    )`;
const database = new sqlite3_1.default.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log("Database connected.");
        database.run(DDL_SCRIPT, (err) => {
            if (err) {
                console.log("Table items already exists.");
            }
            else {
                console.log("Table items created.");
            }
        });
    }
});
exports.default = database;
//# sourceMappingURL=database.js.map