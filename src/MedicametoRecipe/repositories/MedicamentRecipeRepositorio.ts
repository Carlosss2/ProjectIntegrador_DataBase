import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { MedicamentRecipe } from "../models/MedicamentRecipe";

export class MedicamentRecipeRepository {

    public static async findAll(): Promise<MedicamentRecipe[]> {
        const query = "SELECT * FROM medicamentRecipe";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicamentRecipes: MedicamentRecipe[] = results as MedicamentRecipe[];
                    resolve(medicamentRecipes);
                }
            });
        });
    }

    public static async findById(medicamentRecipe_id: number): Promise<MedicamentRecipe | null> {
        const query = "SELECT * FROM medicamentRecipe WHERE medicamentRecipe_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [medicamentRecipe_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const medicamentRecipes: MedicamentRecipe[] = results as MedicamentRecipe[];
                    if (medicamentRecipes.length > 0) {
                        resolve(medicamentRecipes[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMedicamentRecipe(medicamentRecipe: MedicamentRecipe): Promise<MedicamentRecipe> {
        const { date, doctor, medicaments, history, created_at, created_by, updated_at, updated_by, deleted } = medicamentRecipe;
        const query = `
            INSERT INTO medicamentRecipe (date, doctor, medicaments, history, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [date, doctor, medicaments, history, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdMedicamentRecipeId = (result as any).insertId;
                    const createdMedicamentRecipe: MedicamentRecipe = { ...medicamentRecipe, medicamentRecipe_id: createdMedicamentRecipeId };
                    resolve(createdMedicamentRecipe);
                }
            });
        });
    }

    public static async updateMedicamentRecipe(medicamentRecipe_id: number, updatedData: MedicamentRecipe): Promise<MedicamentRecipe | null> {
        const { date, doctor, medicaments, history, updated_at, updated_by, deleted } = updatedData;
        const query = `
            UPDATE medicamentRecipe
            SET date = ?, doctor = ?, medicaments = ?, history = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE medicamentRecipe_id = ?
        `;
        const values = [date, doctor, medicaments, history, updated_at, updated_by, deleted ? 1 : 0, medicamentRecipe_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...updatedData, medicamentRecipe_id: medicamentRecipe_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMedicamentRecipe(medicamentRecipe_id: number): Promise<boolean> {
        const query = 'DELETE FROM medicamentRecipe WHERE medicamentRecipe_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [medicamentRecipe_id], (error, result) => {
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
