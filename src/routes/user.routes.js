import express from "express";
import {
  deleteUserAdmin,
  getAllUser,
  getByIdUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";
import { dataValida } from "../middlewares/match.js";

export const routerUser = express.Router();
routerUser.get("/users", getAllUser);
routerUser.get("/users/:id", getByIdUser);
routerUser.put("/users/:id", updateUser);
routerUser.delete("/users/:id", deleteUserAdmin);

// Users (acceso admin):
// ● GET /api/users → Listar todos los usuarios con populate de artículos. (solo admin)
// ● GET /api/users/:id → Obtener usuario específico con artículos y comentarios. (solo
// admin)
// ● PUT /api/users/:id → Actualizar usuario (solo admin).
// ● DELETE /api/users/:id → Eliminación física de usuario (solo admin).
