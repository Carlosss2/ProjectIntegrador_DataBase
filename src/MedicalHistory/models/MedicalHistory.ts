export interface MedicalHistory{
    medicalHistory_id : number  | null;
    user_id_fk : number;
    asunto:string;
    diagnostico:string;
    medicamentos:string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
