import { DoctorRepositorio } from "../repositories/DoctorRepositorio";
import { Doctor } from "../models/Doctor";
import { DateUtils } from "../../shared/utils/DateUtils";

export class DoctorService {

    public static async getAllDoctors(): Promise<Doctor[]> {
        try {
            return await DoctorRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener doctores: ${error.message}`);
        }
    }

    public static async getDoctorById(doctorId: number): Promise<Doctor | null> {
        try {
            return await DoctorRepositorio.findById(doctorId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el doctor: ${error.message}`);
        }
    }

    public static async addDoctor(doctor: Doctor): Promise<Doctor> {
        try {
            doctor.created_at = DateUtils.formatDate(new Date());
            doctor.updated_at = DateUtils.formatDate(new Date());
            return await DoctorRepositorio.createDoctor(doctor);
        } catch (error: any) {
            throw new Error(`Error al crear el doctor: ${error.message}`);
        }
    }

    public static async modifyDoctor(doctorId: number, doctorData: Doctor): Promise<Doctor | null> {
        try {
            const doctorFound = await DoctorRepositorio.findById(doctorId);
            if (doctorFound) {
                if (doctorData.user_id_fk) {
                    doctorFound.user_id_fk = doctorData.user_id_fk;
                }
                if (doctorData.deleted !== undefined) {
                    doctorFound.deleted = doctorData.deleted;
                }
            } else {
                return null;
            }
            doctorFound.updated_at = DateUtils.formatDate(new Date());
            return await DoctorRepositorio.updateDoctor(doctorId, doctorFound);
        } catch (error: any) {
            throw new Error(`Error al modificar el doctor: ${error.message}`);
        }
    }

    public static async deleteDoctor(doctorId: number): Promise<boolean> {
        try {
            return await DoctorRepositorio.deleteDoctor(doctorId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el doctor: ${error.message}`);
        }
    }
}
