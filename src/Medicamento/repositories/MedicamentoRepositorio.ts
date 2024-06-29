import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { Medicamento } from "../models/Medicamento";

export class MedicamentoRepositorio {

    public static async findAll(): Promise<Medicamento[]> {
        const query = "SELECT * FROM medicamento";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicamentos: Medicamento[] = results as Medicamento[];
                    resolve(medicamentos);
                }
            });
        });
    }

    public static async findById(medicamento_id: number): Promise<Medicamento | null> {
        const query = "SELECT * FROM medicamento WHERE medicamento_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [medicamento_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicamentos: Medicamento[] = results as Medicamento[];
                    if (medicamentos.length > 0) {
                        resolve(medicamentos[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicamento(medicamento: Medicamento): Promise<Medicamento> {
        const { expirationDate, name, quantty, created_at, created_by, updated_at, updated_by, deleted } = medicamento;
        const query = `
            INSERT INTO medicamento (expirationDate, name, quantity, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [expirationDate, name, quantty, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdMedicamentoId = (result as any).insertId;
                    const createdMedicamento: Medicamento = { ...medicamento, medicamento_id: createdMedicamentoId };
                    resolve(createdMedicamento);
                }
            });
        });
    }

    public static async updateMedicamento(medicamento_id: number, userData: Medicamento): Promise<Medicamento | null> {
  
        const { expirationDate, name,quantty , updated_at, updated_by, deleted } = userData;
        const query = `
            UPDATE medicamento
            SET expirationDate = ?, name = ?, quantity = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE medicamento_id = ?
        `;
        const values = [expirationDate, name, quantty, updated_at, updated_by, deleted ? 1 : 0, medicamento_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...userData, medicamento_id: medicamento_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMedicamento(medicamento_id: number): Promise<boolean> {
        const query = 'DELETE FROM medicamento WHERE medicamento_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [medicamento_id], (error, result) => {
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
