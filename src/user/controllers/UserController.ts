import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export const loginUser= async (req: Request, res: Response) => {
    const { name: name, password } = req.body;
    try {
      const token = await UserService.login(name, password);
  
      if (!token) {
        res.status(401).json({ message: 'Invalid full name or password' });
      }else{
        res.status(200).json({ token });
      }
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const user = await UserService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await UserService.addUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const updatedUser = await UserService.modifyUser(userId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const deleted = await UserService.deleteUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'Usuario eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const success = await UserService.deleteUserLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found or already logically deleted.' });
        }
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};
