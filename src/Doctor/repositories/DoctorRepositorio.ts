import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/dataBase";
import { Doctor } from "../models/Doctor";

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

    public static async findById(doctor_id: number): Promise<Doctor | null> {
        const query = "SELECT * FROM doctor WHERE doctor_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [doctor_id], (error, results) => {
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

    public static async createDoctor(doctor: Doctor): Promise<Doctor> {
        const { user_id_fk, created_at, created_by, updated_at, updated_by, deleted } = doctor;
        const query = `
            INSERT INTO doctor (user_id_fk, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [user_id_fk, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createDoctorId = (result as any).insertId;
                    const createdDoctor: Doctor = { ...doctor, doctor_id: createDoctorId };
                    resolve(createdDoctor);
                }
            });
        });
    }

    public static async updateDoctor(doctor_id: number, doctorData: Doctor): Promise<Doctor | null> {
        const { user_id_fk, updated_at, updated_by, deleted } = doctorData;
        const query = `
            UPDATE doctor
            SET user_id_fk=?, updated_at=?, updated_by=?, deleted=?
            WHERE doctor_id=?
        `;
        const values = [user_id_fk, updated_at, updated_by, deleted ? 1 : 0, doctor_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...doctorData, doctor_id: doctor_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteDoctor(doctor_id: number): Promise<boolean> {
        const query = 'DELETE FROM doctor WHERE doctor_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [doctor_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}