import { ResultSetHeader } from "mysql2";
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

    public static async findById(rol_id: number): Promise<Role | null> {
        const query = "SELECT * FROM role WHERE rol_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [rol_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    if (roles.length > 0) {
                        resolve(roles[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createRole(role: Role): Promise<Role> {
        const {rol, created_at, created_by, updated_at, updated_by, deleted } = role;
        const query = `
            INSERT INTO role (user_id_fk, rol, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [ rol, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createRoleId = (result as any).insertId;
                    const createdRole: Role = { ...role, rol_id: createRoleId };
                    resolve(createdRole);
                }
            });
        });
    }

    public static async updateRole(rol_id: number, roleData: Role): Promise<Role | null> {
        const {  rol, updated_at, updated_by, deleted } = roleData;
        const query = `
            UPDATE role
            SET user_id_fk=?, rol=?, updated_at=?, updated_by=?, deleted=?
            WHERE rol_id=?
        `;
        const values = [ rol, updated_at, updated_by, deleted ? 1 : 0, rol_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...roleData, rol_id: rol_id });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteRole(rol_id: number): Promise<boolean> {
        const query = 'DELETE FROM role WHERE rol_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [rol_id], (error, result) => {
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
