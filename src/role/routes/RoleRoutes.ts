import { Router } from "express";
import { getAllRoles,getRoleById,createRole,updateRole,deleteRole } from "../controllers/RoleController";

const roleRoutes: Router = Router();

roleRoutes.get('/', getAllRoles);
roleRoutes.get('/:role_id', getRoleById);
roleRoutes.post('/', createRole);
roleRoutes.put('/:role_id', updateRole);
roleRoutes.delete('/:role_id', deleteRole);

export default roleRoutes;
