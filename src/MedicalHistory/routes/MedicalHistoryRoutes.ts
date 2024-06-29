import { Router } from "express";
import { getAllMedicalHistories,getMedicalHistoryById,createMedicalHistory,updateMedicalHistory,deleteMedicalHistory } from "../controllers/MedicalHistory";
const medicalHistoryRoutes: Router = Router();

medicalHistoryRoutes.get('/', getAllMedicalHistories);
medicalHistoryRoutes.get('/:medicalHistory_id', getMedicalHistoryById);
medicalHistoryRoutes.post('/', createMedicalHistory);
medicalHistoryRoutes.put('/:medicalHistory_id', updateMedicalHistory);
medicalHistoryRoutes.delete('/:medicalHistory_id', deleteMedicalHistory);

export default medicalHistoryRoutes;
