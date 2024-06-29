import { MedicamentRecipeRepository } from "../repositories/MedicamentRecipeRepositorio";
import { MedicamentRecipe } from "../models/MedicamentRecipe";
import { DateUtils } from "../../shared/utils/DateUtils";

export class MedicamentRecipeService {

    public static async getAllMedicamentRecipes(): Promise<MedicamentRecipe[]> {
        try {
            return await MedicamentRecipeRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener recetas de medicamentos: ${error.message}`);
        }
    }

    public static async getMedicamentRecipeById(medicamentRecipeId: number): Promise<MedicamentRecipe | null> {
        try {
            return await MedicamentRecipeRepository.findById(medicamentRecipeId);
        } catch (error: any) {
            throw new Error(`Error al encontrar receta de medicamento: ${error.message}`);
        }
    }

    public static async addMedicamentRecipe(medicamentRecipe: MedicamentRecipe) {
        try {
            medicamentRecipe.created_at = DateUtils.formatDate(new Date()); 
            medicamentRecipe.updated_at = DateUtils.formatDate(new Date()); 
            return await MedicamentRecipeRepository.createMedicamentRecipe(medicamentRecipe);
        } catch (error: any) {
            throw new Error(`Error al crear receta de medicamento: ${error.message}`);
        }
    }

    public static async modifyMedicamentRecipe(medicamentRecipeId: number, medicamentRecipeData: MedicamentRecipe) {
        try {
            const medicamentRecipeFound = await MedicamentRecipeRepository.findById(medicamentRecipeId);
            if (medicamentRecipeFound) {
                if (medicamentRecipeData.date) {
                    medicamentRecipeFound.date = medicamentRecipeData.date;
                }
                if (medicamentRecipeData.doctor) {
                    medicamentRecipeFound.doctor = medicamentRecipeData.doctor;
                }
                if (medicamentRecipeData.medicaments) {
                    medicamentRecipeFound.medicaments = medicamentRecipeData.medicaments;
                }
                if (medicamentRecipeData.history) {
                    medicamentRecipeFound.history = medicamentRecipeData.history;
                }
                if (medicamentRecipeData.deleted !== undefined) {
                    medicamentRecipeFound.deleted = medicamentRecipeData.deleted;
                }
            } else {
                return null;
            }
            medicamentRecipeFound.updated_at = DateUtils.formatDate(new Date());
            return await MedicamentRecipeRepository.updateMedicamentRecipe(medicamentRecipeId, medicamentRecipeFound);
        } catch (error: any) {
            throw new Error(`Error al modificar receta de medicamento: ${error.message}`);
        }
    }

    public static async deleteMedicamentRecipe(medicamentRecipeId: number): Promise<boolean> {
        try {
            return await MedicamentRecipeRepository.deleteMedicamentRecipe(medicamentRecipeId);
        } catch (error: any) {
            throw new Error(`Error al eliminar receta de medicamento: ${error.message}`);
        }
    }
}
