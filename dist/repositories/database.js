"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const DBSOURCE = "db.sqlite";
const usersTable = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cpf INTEGER
    )`;
const stocksTable = `
    CREATE TABLE stocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      acronym TEXT,
      name TEXT,
      currentValue NUMERIC
    )`;
const ordersTable = `
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dateTime TEXT,
      quantity INTEGER,
      totalValue NUMERIC
    )`;
const database = new sqlite3_1.default.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log("Database connected.");
        database.run(usersTable, (err) => {
            if (err) {
                console.log("Table items already exists.");
            }
            else {
                console.log("Table items created.");
            }
        });
        database.run(stocksTable, (err) => {
            if (err) {
                console.log("Table items already exists.");
            }
            else {
                console.log("Table items created.");
            }
        });
        database.run(ordersTable, (err) => {
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