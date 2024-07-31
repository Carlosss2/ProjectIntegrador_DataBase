import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { MedicalAppoinet } from "../models/MedicalAppoinet";
import { User } from '../../user/models/User'

export class MedicalAppoinetRepositorio {

    public static async findAll(): Promise<MedicalAppoinet[]> {
        const query = `WITH RankedAppointments AS (
                        SELECT
                        medicalAppoinet.*,
                        user.*,
                        ROW_NUMBER() OVER (PARTITION BY pacienteID ORDER BY citaID) AS rn
                        FROM medicalAppoinet
                        NATURAL JOIN user
                        WHERE estado = "Pendiente")
                        SELECT *
                        FROM RankedAppointments
                        WHERE rn = 1;`;
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medical: MedicalAppoinet[] = results as MedicalAppoinet[];
                    resolve(medical);
                }
            });
        });
    }

    public static async findById(citaID: number): Promise<MedicalAppoinet | null> {
        const query = "SELECT * FROM medicalAppoinet WHERE citaID = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [ citaID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicals: MedicalAppoinet[] = results as MedicalAppoinet[];
                    if (medicals.length > 0) {
                        resolve(medicals[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicalAppoinet(paciente: User, medical: MedicalAppoinet): Promise<MedicalAppoinet> {
        let {doctorID, pacienteID, fecha, estado} = medical;
        const {names, last_name, email, phone_number} = paciente;   
        const createdUser: any = await connection.promise().execute(
            `INSERT INTO user (names, last_name, email, phone_number, roleID) VALUES (?, ?, ?, ?, ?)`,
            [names, last_name, email, phone_number, 3]
        );
        let userID:number = 0;
        if (createdUser) {
            userID = createdUser[0].insertId;
        }
        const createdPatient: any = await connection.promise().execute(
            `INSERT INTO pacient (roleID, userID) VALUES (3, ?)`,
            [userID]
        );
        if (createdPatient) {
            pacienteID = createdPatient[0].insertId
        }

        const query = `
        INSERT INTO medicalAppoinet (doctorID, pacienteID, fecha, estado)
        VALUES (?, ?, ?, ?)
        `;
    const values = [doctorID, pacienteID, fecha, estado];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createcitaID = (result as any).insertId;
                    const createMedicalAppoinet: MedicalAppoinet = { ...medical, citaID: createcitaID };
                    resolve(createMedicalAppoinet);
                }
            });
        });
    }
    
    
    public static async updateMedicalAppoinet(citaID: number, userData: MedicalAppoinet): Promise<MedicalAppoinet | null> {
        const {fecha, estado } = userData;
        const query = `
            UPDATE medicalAppoinet
            estado = ?
            WHERE citaID = ?
        `;
        const values = [ estado ? 1 : 0, citaID];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, citaID: citaID });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteMedicalAppoinet(citaID: number): Promise<boolean> {
        const query = 'DELETE FROM medicalAppoinet WHERE citaID = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [citaID], (error, result) => {
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