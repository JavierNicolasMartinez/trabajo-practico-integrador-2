import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getByIdTag,
  updateTag,
} from "../controllers/tags.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { dataValida } from "../middlewares/match.js";
import { adminMiddleware } from "../middlewares/admin.js";
import {
  createTagValidations,
  tagidValidation,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";
import { OwnerOrAdminCommentMiddleware } from "../middlewares/owner.js";

export const routerTag = express.Router();
routerTag.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  aplicarValidaciones,
  dataValida,
  createTag
);
routerTag.get("/tags", authMiddleware, getAllTags);
routerTag.get(
  "/tags/:id",
  authMiddleware,
  tagidValidation,
  aplicarValidaciones,
  getByIdTag
);
routerTag.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  tagidValidation,
  updateTagValidations,
  aplicarValidaciones,
  dataValida,
  updateTag
);
routerTag.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  tagidValidation,
  aplicarValidaciones,
  deleteTag
);

// Tags:
// ● POST /api/tags → Crear etiqueta (solo admin).
// ● GET /api/tags → Listar todas las etiquetas. (usuario autenticado)
// ● GET /api/tags/:id → Obtener etiqueta con populate de artículos asociados (usuario
// autenticado).
// ● PUT /api/tags/:id → Actualizar etiqueta (solo admin).
// ● DELETE /api/tags/:id → Eliminar etiqueta (solo admin).
