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

    public static async findByEmail(email: string, password: string): Promise<User | null> {
        const query = "SELECT * FROM user WHERE email=?";
        return new Promise((resolve, reject) => {
            connection.query(query, [email], (error, results) => {
                if (error) {
                    console.log(error);
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

    public static async createUser(user: User): Promise<User | null> {
        try {
            const { names, last_name, password, email, phone_number, roleID } = user;
        const query = `
            INSERT INTO user (names, last_name, password, email, phone_number, roleID)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [names, last_name, password, email, phone_number, roleID];

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
        } catch (error) {
            console.error(error);
            return null
        }
        
    }

    public static async updateUser(user_id: number, userData: User): Promise<User | null> {
        const { names, last_name, password, email, phone_number, roleID } = userData;
        const query = `
            UPDATE user
            SET names=?, last_name=?, password=?, email=?, phone_number=?, roleID=?
            WHERE user_id=?
        `;
        const values = [names, last_name, password, email, phone_number, roleID ? 1 : 0, user_id];

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
}
