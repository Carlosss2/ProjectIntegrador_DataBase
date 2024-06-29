import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { MedicalHistory } from "../models/MedicalHistory";

export class MedicalHistoryRepositorio {

    public static async findAll(): Promise<MedicalHistory[]> {
        const query = "SELECT * FROM medicalHistory";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicalHistories: MedicalHistory[] = results as MedicalHistory[];
                    resolve(medicalHistories);
                }
            });
        });
    }

    public static async findById(medicalHistory_id: number): Promise<MedicalHistory | null> {
        const query = "SELECT * FROM medicalHistory WHERE medicalHistory_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [medicalHistory_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicalHistories: MedicalHistory[] = results as MedicalHistory[];
                    if (medicalHistories.length > 0) {
                        resolve(medicalHistories[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicalHistory(medicalHistory: MedicalHistory): Promise<MedicalHistory> {
        const { user_id_fk, date, name, created_at, created_by, updated_at, updated_by, deleted } = medicalHistory;
        const query = `
            INSERT INTO medicalHistory (paciente_id_fk, date, name, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [user_id_fk, date, name, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createMedicalHistoryId = (result as any).insertId;
                    const createMedicalHistory: MedicalHistory = { ...medicalHistory, medicalHistory_id: createMedicalHistoryId };
                    resolve(createMedicalHistory);
                }
            });
        });
    }

    public static async updateMedicalHistory(medicalHistory_id: number, userData: MedicalHistory): Promise<MedicalHistory | null> {
        const { user_id_fk, date, name, updated_at, updated_by, deleted } = userData;
        const query = `
            UPDATE medicalHistory
            SET paciente_id_fk = ?, date = ?, name = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE medicalHistory_id = ?
        `;
        const values = [user_id_fk, date, name, updated_at, updated_by, deleted ? 1 : 0, medicalHistory_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, medicalHistory_id: medicalHistory_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMedicalHistory(medicalHistory_id: number): Promise<boolean> {
        const query = 'DELETE FROM medicalHistory WHERE medicalHistory_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [medicalHistory_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
