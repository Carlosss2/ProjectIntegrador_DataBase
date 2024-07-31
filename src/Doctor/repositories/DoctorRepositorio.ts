import connection from "../../shared/config/dataBase";
import { Doctor } from "../models/Doctor";
import { Secretary } from "../../Secretary/models/Secretary"
import { User } from "../../user/models/User";

export class DoctorRepositorio {

    public static async findAll(): Promise<Doctor[]> {
        const query = "SELECT * FROM doctor";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const doctors: Doctor[] = results as Doctor[];
                    resolve(doctors);
                }
            });
        });
    }

    public static async findByEmail(email: string): Promise<Doctor | null> {
        const query = "SELECT password,names  FROM doctor natural JOIN user WHERE email = ? ";
        return new Promise((resolve, reject) => {
            connection.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const doctors: Doctor[] = results as Doctor[];
                    if (doctors.length > 0) {
                        resolve(doctors[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createNewSecretary(secretary: Secretary, user: User): Promise<Secretary | null>{
        try {
            const {names, last_name, password, email, phone_number}= user;
            const {doctorID, roleID} = secretary; 

            const query2 = `INSERT INTO secretary (doctorID, userID,roleID) VALUES (?, ?, ?)`

            return new Promise(async (resolve, reject) => {
                
                const createdUser: any = await connection.promise().execute(
                    `INSERT INTO user (names, last_name, password, email, phone_number, roleID) VALUES (?, ?, ?, ?, ?, 2)`,
                    [names, last_name, password, email, phone_number]
                );
                let userID:number = 0;
                if (createdUser) {
                    userID = createdUser[0].insertId;
                }
                const values = [doctorID, userID,roleID]
                connection.query(query2, values, (error, result) =>{
                if (error){
                    reject(error);
                } else {
                    const createSecreta = (result as any).secretaryID;
                    const createdSecretary:Secretary = {...secretary, secretaryID: createSecreta}
                    resolve(createdSecretary); 
                }
              })
            })
        } catch (error) {
            console.error();
            return null;
        }
    }
}