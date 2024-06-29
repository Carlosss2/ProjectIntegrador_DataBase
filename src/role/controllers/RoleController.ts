import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';

export const getAllRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.rol_id, 10);
        const role = await RoleService.getRoleById(roleId);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Rol no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createRole = async (req: Request, res: Response) => {
    try {
        const newRole = await RoleService.addRole(req.body);
        res.status(201).json(newRole);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.rol_id, 10);
        const updatedRole = await RoleService.modifyRole(roleId, req.body);
        if (updatedRole) {
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: 'Rol no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.rol_id, 10);
        const deleted = await RoleService.deleteRole(roleId);
        if (deleted) {
            res.status(200).json({ message: 'Rol eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Rol no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
