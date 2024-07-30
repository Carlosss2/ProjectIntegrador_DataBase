import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { User } from "../models/User";

export class UserRepositorio {

    public static async findAll(): Promise<User[]> {
        const query = "SELECT * FROM user";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findById(user_id: number): Promise<User | null> {
        const query = "SELECT * FROM user WHERE user_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByFullName(name: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM user WHERE name = ?', [name], (error: any, results) => {
            if (error) {
              reject(error);
            } else {
              const employees: User[] = results as User[];
              if (employees.length > 0) {
                resolve(employees[0]);
              } else {
                resolve(null);
              }
            }
          });
        });
      }
    


    public static async createUser(user: User): Promise<User> {
        const { first_name, last_name, password, email, phoneNumber, rol_id_fk } = user;
        const query = `
            INSERT INTO user (first_name, last_name, password, email, phoneNumber, rol_id_fk)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [first_name, last_name, password, email, phoneNumber, rol_id_fk ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createUserId = (result as any).insertId;
                    const createdUser: User = { ...user, user_id: createUserId };
                    resolve(createdUser);
                }
            });
        });
    }

    public static async updateUser(user_id: number, userData: User): Promise<User | null> {
        const { first_name, last_name, password, email, phoneNumber, rol_id_fk } = userData;
        const query = `
            UPDATE user
            SET first_name=?, last_name=?, password=?, email=?, phoneNumber=?, rol_id_fk=?
            WHERE user_id=?
        `;
        const values = [first_name, last_name, password, email, phoneNumber, rol_id_fk ? 1 : 0, user_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, user_id: user_id });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteUser(user_id: number): Promise<boolean> {
        const query = 'DELETE FROM user WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
    public static async deleteLogic(user_id: number): Promise<boolean> {
        const query = 'UPDATE user SET deleted = 1 WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true); 
                    } else {
                        resolve(false); 
                    }
                }
            });
        });
    }

   



}
