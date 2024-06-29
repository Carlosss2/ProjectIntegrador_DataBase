import { Router } from "express";
import { getAllMedicamentRecipes, getMedicamentRecipeById, createMedicamentRecipe, updateMedicamentRecipe, deleteMedicamentRecipe } from "../controllers/MedicamentRecipeController";

const medicamentRecipeRoutes: Router = Router();

medicamentRecipeRoutes.get('/', getAllMedicamentRecipes);
medicamentRecipeRoutes.get('/:medicamentRecipe_id', getMedicamentRecipeById);
medicamentRecipeRoutes.post('/', createMedicamentRecipe);
medicamentRecipeRoutes.put('/:medicamentRecipe_id', updateMedicamentRecipe);
medicamentRecipeRoutes.delete('/:medicamentRecipe_id', deleteMedicamentRecipe);

export default medicamentRecipeRoutes;
