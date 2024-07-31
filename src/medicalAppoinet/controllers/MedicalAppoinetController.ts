import { Request, Response } from 'express';
import { MedicalAppoinetService } from '../services/medicalAppoinetServices';

export const getAllMedicalAppoinets = async (_req: Request, res: Response) => {
    try {
        const medicalAppoinets = await MedicalAppoinetService.getAllMedicalAppoinet();
        res.status(200).json(medicalAppoinets);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicalAppoinetById = async (req: Request, res: Response) => {
    try {
        const citaID = parseInt(req.params.citaID, 10);
        const medicalAppoinet = await MedicalAppoinetService.getMedicalAppoinetById(citaID);
        if (medicalAppoinet) {
            res.status(200).json(medicalAppoinet);
        } else {
            res.status(404).json({ message: 'Cita médica no encontrada.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicalAppoinet = async (req: Request, res: Response) => {
    try {
        const paciente = req.body.paciente;
        const cita = req.body.cita;
        const newMedicalAppoinet = await MedicalAppoinetService.addMedicalAppoinet(paciente, cita);
        res.status(201).json(newMedicalAppoinet);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicalAppoinet = async (req: Request, res: Response) => {
    try {
        const citaID = parseInt(req.params.citaID, 10);
        const updatedMedicalAppoinet = await MedicalAppoinetService.modifyMedicalAppoinet(citaID, req.body);
        if (updatedMedicalAppoinet) {
            res.status(200).json(updatedMedicalAppoinet);
        } else {
            res.status(404).json({ message: 'Cita médica no encontrada o no se pudo actualizar.' });
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicalAppoinet = async (req: Request, res: Response) => {
    try {
        const citaID = parseInt(req.params.citaID, 10);
        const deleted = await MedicalAppoinetService.deleteMedicalAppoinet(citaID);
        if (deleted) {
            res.status(200).json({ message: 'Cita médica eliminada correctamente.' });
        } else {
            res.status(404).json({ message: 'Cita médica no encontrada o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
