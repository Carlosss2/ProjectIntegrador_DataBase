export interface MedicalAppinet{
    medicalAppoinet_id : number  | null;
    user_id_fk : number;
    date: string;
    dateAppoinet: string;
    hour: string
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}

//pasar id del user nada mas  otro atributo paciente_id_fk aggregar la tabla pibote de muchos a muchos