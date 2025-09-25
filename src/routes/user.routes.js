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
import { dataValida } from "../middlewares/match.js";
import { OwnerOrAdminCommentMiddleware } from "../middlewares/owner.js";
import { idUserValidations } from "../middlewares/validations/user.validations.js";

export const routerUser = express.Router();
routerUser.get("/users", authMiddleware, adminMiddleware, getAllUser);
routerUser.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  aplicarValidaciones,
  dataValida,
  getByIdUser
);
routerUser.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  aplicarValidaciones,
  dataValida,
  updateUser
);
routerUser.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  aplicarValidaciones,
  dataValida,
  deleteUserAdmin
);

// Users (acceso admin):
// ● GET /api/users → Listar todos los usuarios con populate de artículos. (solo admin)
// ● GET /api/users/:id → Obtener usuario específico con artículos y comentarios. (solo
// admin)
// ● PUT /api/users/:id → Actualizar usuario (solo admin).
// ● DELETE /api/users/:id → Eliminación física de usuario (solo admin).
