import { RoleRepositorio } from "../repositories/RoleRepositorio";
import { Role } from "../models/Role";
import { DateUtils } from "../../shared/utils/DateUtils"; 

export class RoleService {

    public static async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener roles: ${error.message}`);
        }
    }

    public static async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return await RoleRepositorio.findById(roleId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }

    public static async addRole(role: Role): Promise<Role> {
        try {
            role.created_at = DateUtils.formatDate(new Date());
            role.updated_at = DateUtils.formatDate(new Date());
            return await RoleRepositorio.createRole(role);
        } catch (error: any) {
            throw new Error(`Error al crear el rol: ${error.message}`);
        }
    }

    public static async modifyRole(roleId: number, roleData: Role): Promise<Role | null> {
        try {
            const roleFinded = await RoleRepositorio.findById(roleId);
            if (roleFinded) {
                if (roleData.rol) {
                    roleFinded.rol = roleData.rol;
                }
                if (roleData.deleted !== undefined) {
                    roleFinded.deleted = roleData.deleted;
                }
            } else {
                return null;
            }
            roleFinded.updated_at = DateUtils.formatDate(new Date());
            return await RoleRepositorio.updateRole(roleId, roleFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar el rol: ${error.message}`);
        }
    }

    public static async deleteRole(roleId: number): Promise<boolean> {
        try {
            return await RoleRepositorio.deleteRole(roleId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el rol: ${error.message}`);
        }
    }
}
