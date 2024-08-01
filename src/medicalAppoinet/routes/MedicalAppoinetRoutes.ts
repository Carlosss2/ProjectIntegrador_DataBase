import { Router } from "express";
import { getAllMedicalAppoinets, getMedicalAppoinetById, updateMedicalAppoinet, createMedicalAppoinet, deleteMedicalAppoinet } from "../controllers/MedicalAppoinetController";

const medicalAppoinetRoutes: Router = Router();

medicalAppoinetRoutes.get('/', getAllMedicalAppoinets);
medicalAppoinetRoutes.get('/:citaID', getMedicalAppoinetById);
medicalAppoinetRoutes.post('/', createMedicalAppoinet);
medicalAppoinetRoutes.put('/:citaID', updateMedicalAppoinet);
medicalAppoinetRoutes.delete('/:citaID', deleteMedicalAppoinet);

export default medicalAppoinetRoutes;
