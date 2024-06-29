import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { MedicalAppinet } from "../models/MedicalAppoinet";

export class MedicalAppinetRepositorio {

    public static async findAll(): Promise<MedicalAppinet[]> {
        const query = "SELECT * FROM medicalAppoinet";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medical: MedicalAppinet[] = results as MedicalAppinet[];
                    resolve(medical);
                }
            });
        });
    }

    public static async findById(medicalAppoinet_id: number): Promise<MedicalAppinet | null> {
        const query = "SELECT * FROM medicalAppoinet WHERE medicalAppoinet_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [ medicalAppoinet_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicals: MedicalAppinet[] = results as MedicalAppinet[];
                    if (medicals.length > 0) {
                        resolve(medicals[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicalAppoinet(medical: MedicalAppinet): Promise<MedicalAppinet> {
        const { user_id_fk,  date,  dateAppoinet, hour, created_by, updated_at, updated_by, deleted } = medical;
        const query = `
            INSERT INTO medicalAppoinet (paciente_id_fk,  date,  dateAppoinet, hour, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [user_id_fk,  date,  dateAppoinet, hour, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createMedicalAppoinetId = (result as any).insertId;
                    const createMedicalAppoinet: MedicalAppinet = { ...medical, medicalAppoinet_id: createMedicalAppoinetId };
                    resolve(createMedicalAppoinet);
                }
            });
        });
    }
    
    public static async updateMedicalAppoinet(medicalAppoinet_id: number, userData: MedicalAppinet): Promise<MedicalAppinet | null> {
        const {  user_id_fk,  date,  dateAppoinet, hour, updated_at, updated_by, deleted } = userData;
        const query = `
            UPDATE medicalAppoinet
            SET  paciente_id_fk=?,  date=?,  dateAppoinet=?, hour=?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE medicalAppoinet_id = ?
        `;
        const values = [ user_id_fk,  date,  dateAppoinet, hour, updated_at, updated_by, deleted ? 1 : 0, medicalAppoinet_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, medicalAppoinet_id: medicalAppoinet_id });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteMedicalAppoinet(medicalAppoinet_id: number): Promise<boolean> {
        const query = 'DELETE FROM medicalAppoinet WHERE medicalAppoinet_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [medicalAppoinet_id], (error, result) => {
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