import { UserRepositorio } from "../repositories/UserRepositorio";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";

export class UserService {

    public static async login(email: string, password: string): Promise <any> {
        try {
            const user = await UserRepositorio.findByEmail(email, password);
            if (!user) {
                return null;
            }
            console.log(user);
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return null;
            }
            const payload = {
                user_id: user.user_id,
                name: user.names + " " + user.last_name,
                password: user.password,
            };            
            return await [jwt.sign(payload, secretKey, { expiresIn: '1h' }), user];
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

    public static async addUser(user: User): Promise<User | null> {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepositorio.createUser(user);
        } catch (error) {
            console.error(error);
            return null
        }
    }
}