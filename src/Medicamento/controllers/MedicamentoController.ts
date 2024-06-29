import { Request, Response } from 'express';
import { MedicamentoService } from '../services/MedicamentoServices';

export const getAllMedicamentos = async (_req: Request, res: Response) => {
    try {
        const medicamentos = await MedicamentoService.getAllMedicamentos();
        res.status(200).json(medicamentos);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicamentoById = async (req: Request, res: Response) => {
    try {
        const medicamentoId = parseInt(req.params.medicamento_id, 10);
        const medicamento = await MedicamentoService.getMedicamentoById(medicamentoId);
        if (medicamento) {
            res.status(200).json(medicamento);
        } else {
            res.status(404).json({ message: 'Medicamento no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicamento = async (req: Request, res: Response) => {
    try {
        const newMedicamento = await MedicamentoService.addMedicamento(req.body);
        res.status(201).json(newMedicamento);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicamento = async (req: Request, res: Response) => {
    try {
        const medicamentoId = parseInt(req.params.medicamento_id, 10);
        const updatedMedicamento = await MedicamentoService.modifyMedicamento(medicamentoId, req.body);
        if (updatedMedicamento) {
            res.status(200).json(updatedMedicamento);
        } else {
            res.status(404).json({ message: 'Medicamento no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicamento = async (req: Request, res: Response) => {
    try {
        const medicamentoId = parseInt(req.params.medicamento_id, 10);
        const deleted = await MedicamentoService.deleteMedicamento(medicamentoId);
        if (deleted) {
            res.status(200).json({ message: 'Medicamento eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Medicamento no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
