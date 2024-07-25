import { Router } from "express";
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from "../controllers/DoctorController";

const doctorRoutes: Router = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:doctor_id', getDoctorById);
doctorRoutes.post('/', createDoctor);
doctorRoutes.put('/:doctor_id', updateDoctor);
doctorRoutes.delete('/:doctor_id', deleteDoctor);

export default doctorRoutes;