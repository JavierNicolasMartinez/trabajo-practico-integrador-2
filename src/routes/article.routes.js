import express from "express";
import {
  articleCreate,
  deleteArticle,
  getAllArticles,
  getByIdArticle,
  getMyArticles,
  updateMyArticle,
} from "../controllers/article.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { dataValida } from "../middlewares/match.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import {
  ownerOrAdminArticleMiddleware,
  OwnerOrAdminCommentMiddleware,
} from "../middlewares/owner.js";
import {
  createArticleValidations,
  idArticleValidation,
} from "../middlewares/validations/article.validations.js";

export const routerArticle = express.Router();
routerArticle.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  aplicarValidaciones,
  dataValida,
  articleCreate
);
routerArticle.get("/articles", authMiddleware, getAllArticles);
routerArticle.get(
  "/articles/:id",
  authMiddleware,
  idArticleValidation,
  aplicarValidaciones,
  dataValida,
  getByIdArticle
);
routerArticle.get("/articles/my", authMiddleware, getMyArticles);
routerArticle.put(
  "/articles/:id",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  aplicarValidaciones,
  dataValida,
  updateMyArticle
);
routerArticle.delete(
  "/articles/:id",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  aplicarValidaciones,
  dataValida,
  deleteArticle
);

// Articles:
// ● POST /api/articles → Crear artículo. (usuario autenticado)
// ● GET /api/articles → Listar artículos publicados con populate de author y tags.
// (usuario autenticado)
// ● GET /api/articles/:id → Obtener artículo por ID con populate completo. (usuario
// autenticado)
// ● GET /api/articles/my → Listar artículos del usuario logueado. (usuario autenticado)
// ● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
// ● DELETE /api/articles/:id → Eliminación física (solo autor o admin).
