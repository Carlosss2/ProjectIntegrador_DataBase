import { MedicalAppinetRepositorio } from "../repositories/medicalAppoinetRepositorio";
import { MedicalAppinet } from "../models/MedicalAppoinet";
import { DateUtils } from "../../shared/utils/DateUtils"; 

export class MedicalAppoinetService {

    public static async getAllMedicalAppoinet(): Promise<MedicalAppinet[]> {
        try {
            return await MedicalAppinetRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener citas médicas: ${error.message}`);
        }
    }

    public static async getMedicalAppoinetById(medicalAppoinetId: number): Promise<MedicalAppinet | null> {
        try {
            return await MedicalAppinetRepositorio.findById(medicalAppoinetId);
        } catch (error: any) {
            throw new Error(`Error al encontrar cita médica: ${error.message}`);
        }
    }

    public static async addMedicalAppoinet(medicalAppoinet: MedicalAppinet) {
        try {
            medicalAppoinet.created_at = DateUtils.formatDate(new Date()); 
            medicalAppoinet.updated_at = DateUtils.formatDate(new Date()); 
            return await MedicalAppinetRepositorio.createMedicalAppoinet(medicalAppoinet);
        } catch (error: any) {
            throw new Error(`Error al crear cita médica: ${error.message}`);
        }
    }

    public static async modifyMedicalAppoinet(medicalAppoinetId: number, medicalAppoinetData: MedicalAppinet) {
        try {
            const medicalAppoinetFinded = await MedicalAppinetRepositorio.findById(medicalAppoinetId);
            if (medicalAppoinetFinded) {
                if (medicalAppoinetData.date) {
                    medicalAppoinetFinded.date = medicalAppoinetData.date;
                }
                if (medicalAppoinetData.hour) {
                    medicalAppoinetFinded.hour = medicalAppoinetData.hour;
                }
                if (medicalAppoinetData.deleted !== undefined) {
                    medicalAppoinetFinded.deleted = medicalAppoinetData.deleted;
                }
            } else {
                return null;
            }
            medicalAppoinetFinded.updated_at = DateUtils.formatDate(new Date());
            return await MedicalAppinetRepositorio.updateMedicalAppoinet(medicalAppoinetId, medicalAppoinetFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar cita médica: ${error.message}`);
        }
    }

    public static async deleteMedicalAppoinet(medicalAppoinetId: number): Promise<boolean> {
        try {
            return await MedicalAppinetRepositorio.deleteMedicalAppoinet(medicalAppoinetId);
        } catch (error: any) {
            throw new Error(`Error al eliminar cita médica: ${error.message}`);
        }
    }
}
