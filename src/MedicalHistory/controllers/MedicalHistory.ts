import { Request, Response } from 'express';
import { MedicalHistoryService } from '../services/MedicalHistoryServices';

export const getAllMedicalHistories = async (_req: Request, res: Response) => {
    try {
        const medicalHistories = await MedicalHistoryService.getAllMedicalHistories();
        res.status(200).json(medicalHistories);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicalHistoryById = async (req: Request, res: Response) => {
    try {
        const medicalHistoryId = parseInt(req.params.medicalHistory_id, 10);
        const medicalHistory = await MedicalHistoryService.getMedicalHistoryById(medicalHistoryId);
        if (medicalHistory) {
            res.status(200).json(medicalHistory);
        } else {
            res.status(404).json({ message: 'Historial médico no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicalHistory = async (req: Request, res: Response) => {
    try {
        const newMedicalHistory = await MedicalHistoryService.addMedicalHistory(req.body);
        res.status(201).json(newMedicalHistory);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicalHistory = async (req: Request, res: Response) => {
    try {
        const medicalHistoryId = parseInt(req.params.medicalHistory_id, 10);
        const updatedMedicalHistory = await MedicalHistoryService.modifyMedicalHistory(medicalHistoryId, req.body);
        if (updatedMedicalHistory) {
            res.status(200).json(updatedMedicalHistory);
        } else {
            res.status(404).json({ message: 'Historial médico no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicalHistory = async (req: Request, res: Response) => {
    try {
        const medicalHistoryId = parseInt(req.params.medicalHistory_id, 10);
        const deleted = await MedicalHistoryService.deleteMedicalHistory(medicalHistoryId);
        if (deleted) {
            res.status(200).json({ message: 'Historial médico eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Historial médico no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
