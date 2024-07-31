import { Router } from "express";
import { getAllDoctors, getDoctorById, createNewSecretary} from "../controllers/DoctorController";

const doctorRoutes: Router = Router();

doctorRoutes.get('/', getAllDoctors);
doctorRoutes.get('/:doctor_id', getDoctorById);
doctorRoutes.post('/asistente', createNewSecretary)


export default doctorRoutes;