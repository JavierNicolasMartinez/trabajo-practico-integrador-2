import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsArticle,
  getMyComments,
  updateComment,
} from "../controllers/comment.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { dataValida } from "../middlewares/match.js";
import {
  createCommentValidations,
  idArticleCommentValidation,
  idCommentValidation,
  updateCommentValidations,
} from "../middlewares/validations/comment.validations.js";
import { OwnerOrAdminCommentMiddleware } from "../middlewares/owner.js";
import { idArticleValidation } from "../middlewares/validations/article.validations.js";

export const routerComment = express.Router();
routerComment.get("/comments/my", authMiddleware, getMyComments);
routerComment.get(
  "/comments/article/:articleId",
  authMiddleware,
  idArticleCommentValidation,
  aplicarValidaciones,
  getCommentsArticle
);
routerComment.delete(
  "/comments/:id",
  authMiddleware,
  OwnerOrAdminCommentMiddleware,
  idCommentValidation,
  aplicarValidaciones,
  deleteComment
);
routerComment.post(
  "/comments",
  authMiddleware,
  createCommentValidations,
  aplicarValidaciones,
  dataValida,
  createComment
);
routerComment.put(
  "/comments/:id",
  authMiddleware,
  OwnerOrAdminCommentMiddleware,
  idCommentValidation,
  updateCommentValidations,
  aplicarValidaciones,
  dataValida,
  updateComment
);
// Comments:
// ● POST /api/comments → Crear comentario en artículo. (usuario autenticado)
// ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado)
// ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).
