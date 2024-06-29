import { MedicamentoRepositorio } from "../repositories/MedicamentoRepositorio";
import { Medicamento } from "../models/Medicamento";
import { DateUtils } from "../../shared/utils/DateUtils";

export class MedicamentoService {

    public static async getAllMedicamentos(): Promise<Medicamento[]> {
        try {
            return await MedicamentoRepositorio.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener medicamentos: ${error.message}`);
        }
    }

    public static async getMedicamentoById(medicamentoId: number): Promise<Medicamento | null> {
        try {
            return await MedicamentoRepositorio.findById(medicamentoId);
        } catch (error: any) {
            throw new Error(`Error al encontrar medicamento: ${error.message}`);
        }
    }

    public static async addMedicamento(medicamento: Medicamento) {
        try {
            medicamento.created_at = DateUtils.formatDate(new Date()); 
            medicamento.updated_at = DateUtils.formatDate(new Date()); 
            return await MedicamentoRepositorio.createMedicamento(medicamento);
        } catch (error: any) {
            throw new Error(`Error al crear medicamento: ${error.message}`);
        }
    }

    public static async modifyMedicamento(medicamentoId: number, medicamentoData: Medicamento) {
        try {
            const medicamentoFound = await MedicamentoRepositorio.findById(medicamentoId);
            if (medicamentoFound) {
                if (medicamentoData.expirationDate) {
                    medicamentoFound.expirationDate = medicamentoData.expirationDate;
                }
                if (medicamentoData.name) {
                    medicamentoFound.name = medicamentoData.name;
                }
                if (medicamentoData.quantty !== undefined) {
                    medicamentoFound.quantty = medicamentoData.quantty;
                }
                if (medicamentoData.deleted !== undefined) {
                    medicamentoFound.deleted = medicamentoData.deleted;
                }
            } else {
                return null;
            }
            medicamentoFound.updated_at = DateUtils.formatDate(new Date());
            return await MedicamentoRepositorio.updateMedicamento(medicamentoId, medicamentoFound);
        } catch (error: any) {
            throw new Error(`Error al modificar medicamento: ${error.message}`);
        }
    }

    public static async deleteMedicamento(medicamentoId: number): Promise<boolean> {
        try {
            return await MedicamentoRepositorio.deleteMedicamento(medicamentoId);
        } catch (error: any) {
            throw new Error(`Error al eliminar medicamento: ${error.message}`);
        }
    }
}
