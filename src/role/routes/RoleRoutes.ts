import { Router } from "express";
import { getAllRoles} from "../controllers/RoleController";

const roleRoutes: Router = Router();

roleRoutes.get('/', getAllRoles);

export default roleRoutes;
