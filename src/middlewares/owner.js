import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

export const OwnerOrAdminCommentMiddleware = async (req, res, next) => {
  const logueado = req.logeado;
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id });

    if (logueado.role !== "admin" && comment.author !== logueado._id) {
      return res.status(401).json({
        ok: false,
        message: "No tienes permisos",
      });
    }

    next();
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

export const ownerOrAdminArticleMiddleware = async (req, res, next) => {
  const logueado = req.logeado;
  try {
    const articulo = await ArticleModel.findOne({ _id: req.params.id });

    if (logueado.role !== "admin" && articulo.author !== logueado._id) {
      return res.status(403).json({ ok: false, message: "No tiene permisos" });
    }
    next();
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
// export const authorMiddleware = async (req, res, next) => {
//   try {
//     const articulo1 = await ArticleModel.findByPk(req.params.id);

//     if (req.user.id !== articulo1.user_id) {
//       return res.status(403).json({ message: "No es el autor" });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// req.user es la informacion que tiene la cookie del logueado
