import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/RecipeServices';
export const getAllMedicamentRecipes = async (_req: Request, res: Response) => {
    try {
        const medicamentRecipes = await RecipeService.getAllMedicamentRecipes();
        res.status(200).json(medicamentRecipes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicamentRecipeById = async (req: Request, res: Response) => {
    try {
        const medicamentRecipeId = parseInt(req.params.medicamentRecipe_id, 10);
        const medicamentRecipe = await RecipeService.getMedicamentRecipeById(medicamentRecipeId);
        if (medicamentRecipe) {
            res.status(200).json(medicamentRecipe);
        } else {
            res.status(404).json({ message: 'Receta de medicamento no encontrada.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicamentRecipe = async (req: Request, res: Response) => {
    try {
        const newMedicamentRecipe: Recipe = req.body;
        const createdMedicamentRecipe = await RecipeService.addMedicamentRecipe(newMedicamentRecipe);
        res.status(201).json(createdMedicamentRecipe);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicamentRecipe = async (req: Request, res: Response) => {
    try {
        const medicamentRecipeId = parseInt(req.params.medicamentRecipe_id, 10);
        const updatedMedicamentRecipeData: Recipe = req.body;
        const updatedMedicamentRecipe = await RecipeService.modifyMedicamentRecipe(medicamentRecipeId, updatedMedicamentRecipeData);
        if (updatedMedicamentRecipe) {
            res.status(200).json(updatedMedicamentRecipe);
        } else {
            res.status(404).json({ message: 'Receta de medicamento no encontrada o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicamentRecipe = async (req: Request, res: Response) => {
    try {
        const medicamentRecipeId = parseInt(req.params.medicamentRecipe_id, 10);
        const deleted = await RecipeService.deleteMedicamentRecipe(medicamentRecipeId);
        if (deleted) {
            res.status(200).json({ message: 'Receta de medicamento eliminada correctamente.' });
        } else {
            res.status(404).json({ message: 'Receta de medicamento no encontrada o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};