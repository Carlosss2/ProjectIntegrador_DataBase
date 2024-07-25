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
            const medicalAppoinetFound = await MedicalAppinetRepositorio.findById(medicalAppoinetId);
            if (medicalAppoinetFound) {
                if (medicalAppoinetData.dateAppoinet) {
                    medicalAppoinetFound.dateAppoinet = medicalAppoinetData.dateAppoinet;
                }
                if (medicalAppoinetData.hour) {
                    medicalAppoinetFound.hour = medicalAppoinetData.hour;
                }
                if (medicalAppoinetData.status_id_fk !== undefined) {
                    medicalAppoinetFound.status_id_fk = medicalAppoinetData.status_id_fk;
                }
                if (medicalAppoinetData.updated_by) {
                    medicalAppoinetFound.updated_by = medicalAppoinetData.updated_by;
                }
                if (medicalAppoinetData.deleted !== undefined) {
                    medicalAppoinetFound.deleted = medicalAppoinetData.deleted;
                }
            } else {
                return null;
            }
            medicalAppoinetFound.updated_at = DateUtils.formatDate(new Date());
            return await MedicalAppinetRepositorio.updateMedicalAppoinet(medicalAppoinetId, medicalAppoinetFound);
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