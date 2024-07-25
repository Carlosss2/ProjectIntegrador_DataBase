export interface User{
    user_id : number  | null;
    first_name: string;
    last_name:string
    password: string;
    email: string
    phoneNumber:string;
    rol_id_fk:number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}

//modificar rol por rol_id_fk:number