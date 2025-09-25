import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, author, article } = req.body;
  try {
    const comment = await CommentModel.create({
      content,
      author,
      article,
    });

    return res.status(201).json({
      ok: true,
      message: "Comentario creado con exito",
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Comments:
// ● POST /api/comments → Crear comentario en artículo. (usuario autenticado)
// ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado)
// ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).
