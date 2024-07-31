import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import UserRoutes from './user/routes/UserRoutes';
import { errorHandler } from './shared/middlewares/errorHandlers';
import { notFoundHandler } from './shared/middlewares/notFoundHandlers';
import medicalAppoinetRoutes from './medicalAppoinet/routes/MedicalAppoinetRoutes';
import medicalHistoryRoutes from './MedicalHistory/routes/MedicalHistoryRoutes';
import roleRoutes from './role/routes/RoleRoutes';
import cors from 'cors';
import doctorRoutes from './Doctor/routes/DoctorRoutes';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', UserRoutes); 
app.use('/api/medicalAppoinet', medicalAppoinetRoutes); 
app.use('/api/medicalHistory', medicalHistoryRoutes);
app.use('/api/role',roleRoutes)
app.use('/api/doctor', doctorRoutes)

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});