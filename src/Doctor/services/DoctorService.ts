import { DoctorRepositorio } from "../repositories/DoctorRepositorio";
import { Doctor } from "../models/Doctor";
import { Secretary } from "../../Secretary/models/Secretary";
import { User } from "../../user/models/User";
import bcrypt from 'bcrypt';

export class DoctorService {

    public static async getAllDoctors(): Promise<Doctor[]> {
        try {
            return await DoctorRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener doctores: ${error.message}`);
        }
    }

    public static async getDoctorByEmail(): Promise<Secretary[] | null> {
        try {
            return await DoctorRepositorio.findByEmail();
        } catch (error: any) {
            throw new Error(`Error al encontrar el doctor: ${error.message}`);
        }
    }

    public static async createNewSecretary(secretary: Secretary, user: User): Promise<Secretary|null>{
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return await DoctorRepositorio.createNewSecretary(secretary, user);
        } catch (error:any) {
            throw new Error(`Error al crear un doctor: ${error.message}`);
        }
    }

}
