import { Router } from "express";
import { getAllMedicamentos, getMedicamentoById, createMedicamento, updateMedicamento, deleteMedicamento } from "../controllers/MedicamentoController";

const medicamentoRoutes: Router = Router();

medicamentoRoutes.get('/', getAllMedicamentos);
medicamentoRoutes.get('/:medicamento_id', getMedicamentoById);
medicamentoRoutes.post('/', createMedicamento);
medicamentoRoutes.put('/:medicamento_id', updateMedicamento);
medicamentoRoutes.delete('/:medicamento_id', deleteMedicamento);

export default medicamentoRoutes;
