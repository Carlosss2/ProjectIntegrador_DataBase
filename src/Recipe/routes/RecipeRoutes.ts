import { Router } from "express";

import { getAllMedicamentRecipes, getMedicamentRecipeById, createMedicamentRecipe, updateMedicamentRecipe, deleteMedicamentRecipe } from "../controllers/RecipeController";
const RecipeRoutes: Router = Router();

RecipeRoutes.get('/', getAllMedicamentRecipes);
RecipeRoutes.get('/:medicamentRecipe_id', getMedicamentRecipeById);
RecipeRoutes.post('/', createMedicamentRecipe);
RecipeRoutes.put('/:medicamentRecipe_id', updateMedicamentRecipe);
RecipeRoutes.delete('/:medicamentRecipe_id', deleteMedicamentRecipe);

export default RecipeRoutes;