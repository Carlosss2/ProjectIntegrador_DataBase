import { Router } from "express";
import { getAllUsers,getUserById,createUser,updateUser, deleteUser,loginUser,deleteLogicalUser } from "../controllers/UserController";
import { authMiddleware } from "../../shared/middlewares/auth";

const UserRoutes: Router = Router();

UserRoutes.post('/login', loginUser);
UserRoutes.put('/deleted/:user_id/', authMiddleware, deleteLogicalUser);
UserRoutes.get('/', authMiddleware, getAllUsers);
UserRoutes.get('/:user_id', getUserById);
UserRoutes.post('/', createUser);
UserRoutes.put('/:user_id', updateUser);
UserRoutes.delete('/:user_id', deleteUser);

export default UserRoutes;
