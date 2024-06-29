export interface User{
    user_id : number  | null;
    name: string;
    password: string;
    email: string
    phoneNumber:number;
    rol:string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}

//modificar rol por rol_id_fk:number