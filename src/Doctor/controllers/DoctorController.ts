import { Request, Response } from 'express';
import { DoctorService } from '../services/DoctorService';

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctorById = async (req: Request, res: Response) => {
    try {
        const email = req.body
        const doctor = await DoctorService.getDoctorByEmail(email);
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createNewSecretary = async (req: Request, res: Response) => {
    try {
        const secretary = req.body.secretary;
        const user = req.body.user;
        const newSecretary = await DoctorService.createNewSecretary(secretary, user);
        if (newSecretary) {
            res.status(200).json(newSecretary)
        } else {
            res.status(404).json({ message: 'Asistente no creado' })
        }
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}





