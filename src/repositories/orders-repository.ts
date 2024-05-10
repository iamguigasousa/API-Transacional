import Order from "../models/Order";
import database from "./database";

const ordersRepository = {
  addNew: (order: Order, callback: (id?: number) => void) => {
    console.log(order);
    const sql = "INSERT INTO orders (id, dateTime, quantity, totalValue, stockName, executed) VALUES (?, ?)";
    const params = [order.id, order.dateTime, order.quantity, order.totalValue, order.stockName, order.executed === true ? 1 : 0];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllItems: (callback: (orders: Order[]) => void) => {
    const sql = "SELECT * FROM items";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as Order[]));
  },
  getById: (id: number, callback: (order?: Order) => void) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Order));
  },
  update: (id: number, order: Order, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE orders SET dateTime = ?, quantity = ?, totalValue = ?, stockName = ?, executed = ? WHERE id = ?";
    const params = [order.dateTime, order.quantity, order.totalValue, order.stockName, order.executed === true ? 1 : 0, id];
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
export default ordersRepository;
