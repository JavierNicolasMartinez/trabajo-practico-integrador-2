import express from "express";
import {
  getProfileAuth,
  login,
  logout,
  register,
  updateAuthProfile,
} from "../controllers/auth.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { dataValida } from "../middlewares/match.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createUserValidation,
  soloProfileValidation,
} from "../middlewares/validations/auth.validation.js";

export const routerAuth = express.Router();
routerAuth.post(
  "/auth/register",
  createUserValidation,
  aplicarValidaciones,
  dataValida,
  register
);
routerAuth.post("/auth/login", login);
routerAuth.post("/auth/logout", logout);
routerAuth.get("/auth/profile", authMiddleware, getProfileAuth);
routerAuth.put(
  "/auth/profile",
  authMiddleware,
  soloProfileValidation,
  aplicarValidaciones,
  dataValida,
  updateAuthProfile
);
// Desarrollar controladores de autenticación:
// ● POST /api/auth/register: Registro de usuario con perfil embebido. (público)
// ● POST /api/auth/login: Login con JWT enviado como cookie segura. (público)
// ● GET /api/auth/profile: Obtener perfil del usuario autenticado. (usuario autenticado)
// ● PUT /api/auth/profile: Actualizar perfil embebido del usuario autenticado. (usuario
// autenticado)
// ● POST /api/auth/logout: Logout limpiando cookie de autenticación. (usuario
// autenticado)
