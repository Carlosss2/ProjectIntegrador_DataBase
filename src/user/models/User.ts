export interface User{
    user_id : number  | null;
    first_name: string;
    last_name:string
    password: string;
    email: string
    phoneNumber:string;
    rol_id_fk:number;
}
