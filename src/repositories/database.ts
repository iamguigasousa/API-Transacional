import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";

/***
 * Atenção: não existe tipo boolean no banco SQLite.
 * Apenas devemos representar como inteiro
 * sendo: 0 => false e 1 => true.
 */
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
    )`




const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Database connected.");

    database.run(usersTable, (err) => {
      if (err) {
        console.log("Table items already exists.");
      } else {
        console.log("Table items created.");
      }
    });

    database.run(stocksTable, (err) => {
      if (err) {
        console.log("Table items already exists.");
      } else {
        console.log("Table items created.");
      }
    });

    database.run(ordersTable, (err) => {
      if (err) {
        console.log("Table items already exists.");
      } else {
        console.log("Table items created.");
      }
    });
  }
});


export default database;
