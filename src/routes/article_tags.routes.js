import express from "express";
import {
  agregarEtiquetaArticulo,
  removerTagArticle,
} from "../controllers/articleTags.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";
import { dataValida } from "../middlewares/match.js";

export const routerArticleTags = express.Router();
routerArticleTags.post(
  "/articles/:articleId/tags/:tagId",
  agregarEtiquetaArticulo
);
routerArticleTags.delete("/articles/:articleId/tags/:tagId", removerTagArticle);

// Article Tags (relación N:M):
// ● POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo. (solo autor
// o admin)
// ● DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo. (solo
// autor o admin)
