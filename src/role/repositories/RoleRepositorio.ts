import connection from "../../shared/config/dataBase";
import { Role } from "../models/Role";

export class RoleRepositorio {
    public static async findAll(): Promise<Role[]> {
        const query = "SELECT * FROM role";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    resolve(roles);
                }
            });
        });
    }
}