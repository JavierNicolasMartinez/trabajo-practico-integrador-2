import { ArticleModel } from "../models/article.model.js";
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

export const getCommentsArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const commentArt = await ArticleModel.findById(id)
      .populate("Comment")
      .populate("User");

    if (!commentArt) {
      return res.status(404).json({
        ok: false,
        message: "No hay ningun articulo",
      });
    }

    res.status(200).json({
      ok: true,
      message: "El artículo con sus comentarios y author son:",
      commentArt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const logueado = req.logeado;
    const mycomments = await CommentModel.find({ author: logueado._id });
    if (!mycomments) {
      return res.status(404).json({
        ok: false,
        message: "Mensajes no encontrados",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Los comentarios encontrados son:",
      mycomments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        ok: false,
        message: "Comentario no encontrado",
      });
    }

    res.status(201).json({
      ok: true,
      message: "Comentario actualizado",
      updatedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({
        ok: false,
        message: "Comentario no encontrado",
      });
    }

    return res.stutus(200).json({
      ok: true,
      message: "Comentario eliminado",
      deletedComment,
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
// ● POST /api/comments → Crear comentario en artículo. (usuario autenticado) listo
// ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado) listo
// ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).
