import { Router } from "express";
import { getAllUsers,createUser,loginUser } from "../controllers/UserController";

const UserRoutes: Router = Router();

UserRoutes.post('/login', loginUser);
UserRoutes.get('/', getAllUsers);
UserRoutes.post('/', createUser);

export default UserRoutes;
