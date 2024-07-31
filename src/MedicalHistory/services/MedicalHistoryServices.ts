import { MedicalHistory } from "../models/MedicalHistory";
import { MedicalHistoryRepository } from "../repositories/MedicalHistoryRepositorio";

export class MedicalServices {

    public static async getAllHistory(): Promise<MedicalHistory[] |  null>{
        try {
            return await MedicalHistoryRepository.findAll();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    public static async getHistoryById(historyID: number): Promise<MedicalHistory | null>{
        try {
            return await MedicalHistoryRepository.findById(historyID);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public static async createHistory(history: MedicalHistory): Promise<MedicalHistory | null>{
     try {
        return await MedicalHistoryRepository.createMedicalHistory(history)
     } catch (error) {
        console.error(error);
        return null
     }   
    }

    public static async updateHistory(medicalHistory_id: number, updateData: MedicalHistory): Promise<MedicalHistory | null>{
        try {
            return await MedicalHistoryRepository.updateMedicalHistory(medicalHistory_id, updateData)             
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public static async deleteHistory(medicalHistory_id: number): Promise <boolean | null>{
        try {
            return await MedicalHistoryRepository.deleteMedicalHistory(medicalHistory_id)
        } catch (error) {
            console.error(error);
            return null
        }
    }
}