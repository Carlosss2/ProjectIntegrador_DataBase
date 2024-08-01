import { RoleRepositorio } from "../repositories/RoleRepositorio";
import { Role } from "../models/Role";

export class RoleService {

    public static async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener roles: ${error.message}`);
        }
    }
}