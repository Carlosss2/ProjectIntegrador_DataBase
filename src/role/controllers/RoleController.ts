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