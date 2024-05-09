import User from "../models/User";
import database from "./database";

const usersRepository = {
  addNew: (user: User, callback: (id?: number) => void) => {
    console.log(user);
    const sql = "INSERT INTO users (name, cpf) VALUES (?, ?)";
    const params = [user.name, user.cpf];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllItems: (callback: (users: User[]) => void) => {
    const sql = "SELECT * FROM users";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as User[]));
  },
  getById: (id: number, callback: (user?: User) => void) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as User));
  },
  update: (id: number, user: User, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE users SET name = ?, cpf = ? WHERE id = ?";
    const params = [user.name, user.cpf, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};
export default usersRepository;
