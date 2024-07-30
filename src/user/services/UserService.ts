import { UserRepositorio } from "../repositories/UserRepositorio";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class UserService {

    public static async login(name: string, password: string) {
        try {
            const user = await this.getUserByFullName(name);
            if (!user) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return null;
            }

            const payload = {
                user_id: user.user_id,
                name: user.first_name + " " + user.last_name,
                password: user.password,
            };
            return await jwt.sign(payload, secretKey, { expiresIn: '1h' });
        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }
    }

    public static async getAllUsers(): Promise<User[]> {
        try {
            return await UserRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try {
            return await UserRepositorio.findById(userId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el usuario: ${error.message}`);
        }
    }

    public static async getUserByFullName(fullName: string): Promise<User | null> {
        try {
            return await UserRepositorio.findByFullName(fullName);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addUser(user: User): Promise<User> {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepositorio.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User): Promise<User | null> {
        try {
            const userFound = await UserRepositorio.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);
            if (userFound) {
                if (userData.first_name) {
                    userFound.first_name = userData.first_name;
                }
                if (userData.last_name) {
                    userFound.last_name = userData.last_name;
                }
                if (userData.password) {
                    userFound.password = userData.password;
                }
                if (userData.email) {
                    userFound.email = userData.email;
                }
                if (userData.phoneNumber) {
                    userFound.phoneNumber = userData.phoneNumber;
                }
                if (userData.rol_id_fk !== undefined) {
                    userFound.rol_id_fk = userData.rol_id_fk;
                }
            } else {
                return null;
            }
            userFound.password = await bcrypt.hash(userFound.password, salt);

            return await UserRepositorio.updateUser(userId, userFound);
        } catch (error: any) {
            throw new Error(`Error al modificar el usuario: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try {
            return await UserRepositorio.deleteUser(userId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

    public static async deleteUserLogic(userId: number): Promise<boolean> {
        try {
            return await UserRepositorio.deleteLogic(userId);
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}