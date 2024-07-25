export interface MedicalAppinet{
    medicalAppoinet_id : number  | null;
    user_id_fk : number;
    doctor_id_fk:number;
    dateAppoinet: string;
    hour: string
    status_id_fk:number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}

