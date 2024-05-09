import Stock from "../models/Stock";
import database from "./database";

const stocksRepository = {
  addNew: (stock: Stock, callback: (id?: number) => void) => {
    console.log(stock);
    const sql = "INSERT INTO stocks (acronym, name, currentValue) VALUES (?, ?)";
    const params = [stock.acronym, stock.name, stock.currentValue];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllItems: (callback: (stocks: Stock[]) => void) => {
    const sql = "SELECT * FROM items";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as Stock[]));
  },
  getById: (id: number, callback: (stock?: Stock) => void) => {
    const sql = "SELECT * FROM stocks WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Stock));
  },
  update: (id: number, stock: Stock, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE stocks SET acronym = ?, name = ?, currentValue = ? WHERE id = ?";
    const params = [stock.acronym, stock.name, stock.currentValue, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM stocks WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};
export default stocksRepository;
