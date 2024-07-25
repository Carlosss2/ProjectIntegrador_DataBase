import { Request, Response } from 'express';
import { DoctorService } from '../services/DoctorService';

export const getAllDoctors = async (_req: Request, res: Response) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctorById = async (req: Request, res: Response) => {
    try {
        const doctorId = parseInt(req.params.doctor_id, 10);
        const doctor = await DoctorService.getDoctorById(doctorId);
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const newDoctor = await DoctorService.addDoctor(req.body);
        res.status(201).json(newDoctor);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const doctorId = parseInt(req.params.doctor_id, 10);
        const updatedDoctor = await DoctorService.modifyDoctor(doctorId, req.body);
        if (updatedDoctor) {
            res.status(200).json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDoctor = async (req: Request, res: Response) => {
    try {
        const doctorId = parseInt(req.params.doctor_id, 10);
        const deleted = await DoctorService.deleteDoctor(doctorId);
        if (deleted) {
            res.status(200).json({ message: 'Doctor eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Doctor no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
