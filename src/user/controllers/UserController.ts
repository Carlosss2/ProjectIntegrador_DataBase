import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export const loginUser= async (req: Request, res: Response) => {
    const {email, password } = req.body;
    try {
      const token = await UserService.login(email, password);
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


export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await UserService.addUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


