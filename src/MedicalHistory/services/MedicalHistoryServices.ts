import { MedicalHistoryRepositorio } from "../repositories/MedicalHistoryRepositorio";
import { MedicalHistory } from "../models/MedicalHistory";
import { DateUtils } from "../../shared/utils/DateUtils";

export class MedicalHistoryService {

    public static async getAllMedicalHistories(): Promise<MedicalHistory[]> {
        try {
            return await MedicalHistoryRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener historiales médicos: ${error.message}`);
        }
    }

    public static async getMedicalHistoryById(medicalHistoryId: number): Promise<MedicalHistory | null> {
        try {
            return await MedicalHistoryRepositorio.findById(medicalHistoryId);
        } catch (error: any) {
            throw new Error(`Error al encontrar historial médico: ${error.message}`);
        }
    }

    public static async addMedicalHistory(medicalHistory: MedicalHistory) {
        try {
            medicalHistory.created_at = DateUtils.formatDate(new Date()); 
            medicalHistory.updated_at = DateUtils.formatDate(new Date()); 
            return await MedicalHistoryRepositorio.createMedicalHistory(medicalHistory);
        } catch (error: any) {
            throw new Error(`Error al crear historial médico: ${error.message}`);
        }
    }

    public static async modifyMedicalHistory(medicalHistoryId: number, medicalHistoryData: MedicalHistory) {
        try {
            const medicalHistoryFound = await MedicalHistoryRepositorio.findById(medicalHistoryId);
            if (medicalHistoryFound) {
                if (medicalHistoryData.date) {
                    medicalHistoryFound.date = medicalHistoryData.date;
                }
                if (medicalHistoryData.name) {
                    medicalHistoryFound.name = medicalHistoryData.name;
                }
                if (medicalHistoryData.deleted !== undefined) {
                    medicalHistoryFound.deleted = medicalHistoryData.deleted;
                }
            } else {
                return null;
            }
            medicalHistoryFound.updated_at = DateUtils.formatDate(new Date());
            return await MedicalHistoryRepositorio.updateMedicalHistory(medicalHistoryId, medicalHistoryFound);
        } catch (error: any) {
            throw new Error(`Error al modificar historial médico: ${error.message}`);
        }
    }

    public static async deleteMedicalHistory(medicalHistoryId: number): Promise<boolean> {
        try {
            return await MedicalHistoryRepositorio.deleteMedicalHistory(medicalHistoryId);
        } catch (error: any) {
            throw new Error(`Error al eliminar historial médico: ${error.message}`);
        }
    }
}
