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
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { dataValida } from "../middlewares/match.js";

export const routerComment = express.Router();
routerComment.post("/comments", createComment);
routerComment.get("/comments/article/:articleId", getCommentsArticle);
routerComment.get("/comments/my", getMyComments);
routerComment.put("/comments/:id", updateComment);
routerComment.delete("/comments/:id", deleteComment);
// Comments:
// ● POST /api/comments → Crear comentario en artículo. (usuario autenticado)
// ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado)
// ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).
