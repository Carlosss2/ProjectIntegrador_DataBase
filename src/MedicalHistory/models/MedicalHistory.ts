export interface MedicalHistory{
    medicalHistory_id : number  | null;
    user_id_fk : number;
    date: string;
    name: string;
    
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}

