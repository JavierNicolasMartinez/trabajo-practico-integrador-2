import express from "express";
import {
  agregarEtiquetaArticulo,
  removerTagArticle,
} from "../controllers/articleTags.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { dataValida } from "../middlewares/match.js";
import {
  ownerOrAdminArticleMiddleware,
  OwnerOrAdminCommentMiddleware,
} from "../middlewares/owner.js";
import { idArticleValidation } from "../middlewares/validations/article.validations.js";
import { tagidValidation } from "../middlewares/validations/tag.validations.js";

export const routerArticleTags = express.Router();
routerArticleTags.post(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  tagidValidation,
  aplicarValidaciones,
  dataValida,
  agregarEtiquetaArticulo
);
routerArticleTags.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  tagidValidation,
  aplicarValidaciones,
  dataValida,
  removerTagArticle
);

// Article Tags (relación N:M):
// ● POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo. (solo autor
// o admin)
// ● DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo. (solo
// autor o admin)
