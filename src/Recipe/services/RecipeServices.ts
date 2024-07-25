
import { RecipeRepositorio } from "../repositories/RecipeRepositorio";
import { Recipe } from "../models/Recipe";
import { DateUtils } from "../../shared/utils/DateUtils";

export class RecipeService {

    public static async getAllMedicamentRecipes(): Promise<Recipe[]> {
        try {
            return await RecipeRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener recetas de medicamentos: ${error.message}`);
        }
    }

    public static async getMedicamentRecipeById(medicamentRecipeId: number): Promise<Recipe | null> {
        try {
            return await RecipeRepositorio.findById(medicamentRecipeId);
        } catch (error: any) {
            throw new Error(`Error al encontrar receta de medicamento: ${error.message}`);
        }
    }
    

    public static async addMedicamentRecipe(medicamentRecipe: Recipe) {
        try {
            medicamentRecipe.created_at = DateUtils.formatDate(new Date()); 
            medicamentRecipe.updated_at = DateUtils.formatDate(new Date()); 
            return await RecipeRepositorio.createMedicamentRecipe(medicamentRecipe);
        } catch (error: any) {
            throw new Error(`Error al crear receta de medicamento: ${error.message}`);
        }
    }

    public static async modifyMedicamentRecipe(medicamentRecipeId: number, updatedData: Recipe): Promise<Recipe | null> {
        try {
            updatedData.updated_at = DateUtils.formatDate(new Date());
            return await RecipeRepositorio.updateMedicamentRecipe(medicamentRecipeId, updatedData);
        } catch (error: any) {
            throw new Error(`Error al actualizar receta de medicamento: ${error.message}`);
        }
    }

    public static async deleteMedicamentRecipe(medicamentRecipeId: number): Promise<boolean> {
        try {
            return await RecipeRepositorio.deleteMedicamentRecipe(medicamentRecipeId);
        } catch (error: any) {
            throw new Error(`Error al eliminar receta de medicamento: ${error.message}`);
        }
    }
}