import { UserRepositorio } from "../repositories/UserRepositorio";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";


const saltRounds = 10;

export class UserService {
    

    public static async login(name: string, password: string){
        try{
            const user = await this.getUserByFullName(name);
            if(!user){
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return null;
            }

            const payload = {

                user_id : user.user_id,
                name: user.name,
                password: user.password,
            }
            return await jwt.sign(payload, secretKey, { expiresIn: '1h' });

        }catch (error: any){
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
        try{
            return await UserRepositorio.findByFullName(fullName);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addUser(user: User): Promise<User> {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepositorio.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User): Promise<User | null> {
        try {
            const userFinded = await UserRepositorio.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);
            if (userFinded) {
                if (userData.name) {
                    userFinded.name = userData.name;
                }
                if (userData.password) {
                    userFinded.password = userData.password;
                }
                if (userData.email) {
                    userFinded.email = userData.email;
                }
                if (userData.phoneNumber) {
                    userFinded.phoneNumber = userData.phoneNumber;
                }
                if (userData.rol) {
                    userFinded.rol = userData.rol;
                }
                if(userData.updated_by){
                    userFinded.updated_by=userData.updated_by;
                }
                if (userData.deleted !== undefined) {
                    userFinded.deleted = userData.deleted;
                }
            } else {
                return null;
            }
            userFinded.updated_at = DateUtils.formatDate(new Date());
            
            userFinded.password = await bcrypt.hash(userFinded.password,salt)
            
            return await UserRepositorio.updateUser(userId, userFinded);
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
