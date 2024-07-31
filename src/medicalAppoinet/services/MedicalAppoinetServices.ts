import { MedicalAppoinetRepositorio } from "../repositories/medicalAppoinetRepositorio";
import { MedicalAppoinet } from "../models/MedicalAppoinet";
import { User } from "../../user/models/User";

export class MedicalAppoinetService {

    public static async getAllMedicalAppoinet(): Promise<MedicalAppoinet[]> {
        try {
            return await MedicalAppoinetRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener citas médicas: ${error.message}`);
        }
    }

    public static async getMedicalAppoinetById(citaID: number): Promise<MedicalAppoinet | null> {
        try {
            return await MedicalAppoinetRepositorio.findById(citaID);
        } catch (error: any) {
            throw new Error(`Error al encontrar cita médica: ${error.message}`);
        }
    }

    public static async addMedicalAppoinet(paciente: User, cita: MedicalAppoinet) {
        try {
            return await MedicalAppoinetRepositorio.createMedicalAppoinet(paciente, cita);
        } catch (error: any) {
            console.log(error);
            throw new Error(`Error al crear cita médica: ${error.message}`);
        }
    }

    public static async modifyMedicalAppoinet(citaID: number, medicalAppoinetData: MedicalAppoinet) {
        try {
            const medicalAppoinetFound = await MedicalAppoinetRepositorio.findById(citaID);
            if (medicalAppoinetFound) {
                medicalAppoinetFound.estado = medicalAppoinetData.estado;
            } else {
                return null;
            }
            return await MedicalAppoinetRepositorio.updateMedicalAppoinet(citaID, medicalAppoinetFound);
        } catch (error: any) {
            throw new Error(`Error al modificar cita médica: ${error.message}`);
        }
    }

    public static async deleteMedicalAppoinet(citaID: number): Promise<boolean> {
        try {
            return await MedicalAppoinetRepositorio.deleteMedicalAppoinet(citaID);
        } catch (error: any) {
            throw new Error(`Error al eliminar cita médica: ${error.message}`);
        }
    }
}