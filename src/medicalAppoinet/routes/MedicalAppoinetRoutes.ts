import { Router } from "express";
import { getAllMedicalAppoinets, getMedicalAppoinetById, updateMedicalAppoinet, createMedicalAppoinet, deleteMedicalAppoinet } from "../controllers/MedicalAppoinetController";

const medicalAppoinetRoutes: Router = Router();

medicalAppoinetRoutes.get('/', getAllMedicalAppoinets);
medicalAppoinetRoutes.get('/:medicalAppoinet_id', getMedicalAppoinetById);
medicalAppoinetRoutes.post('/', createMedicalAppoinet);
medicalAppoinetRoutes.put('/:medicalAppoinet_id', updateMedicalAppoinet);
medicalAppoinetRoutes.delete('/:medicalAppoinet_id', deleteMedicalAppoinet);

export default medicalAppoinetRoutes;
