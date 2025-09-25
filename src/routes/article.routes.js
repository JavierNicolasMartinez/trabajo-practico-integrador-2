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
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";

export const routerArticle = express.Router();
routerArticle.post("/articles", articleCreate);
routerArticle.get("/articles", getAllArticles);
routerArticle.get("/articles/:id", getByIdArticle);
routerArticle.get("/articles/my", getMyArticles);
routerArticle.put("/articles/:id", updateMyArticle);
routerArticle.delete("/articles/:id", deleteArticle);

// Articles:
// ● POST /api/articles → Crear artículo. (usuario autenticado)
// ● GET /api/articles → Listar artículos publicados con populate de author y tags.
// (usuario autenticado)
// ● GET /api/articles/:id → Obtener artículo por ID con populate completo. (usuario
// autenticado)
// ● GET /api/articles/my → Listar artículos del usuario logueado. (usuario autenticado)
// ● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
// ● DELETE /api/articles/:id → Eliminación física (solo autor o admin).
