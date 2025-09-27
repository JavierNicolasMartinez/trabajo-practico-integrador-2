import { body, param } from "express-validator";
import { CommentModel } from "../../models/comment.model.js";
import { ArticleModel } from "../../models/article.model.js";

export const idCommentValidation = [
  param("id")
    .isMongoId()
    .withMessage("El id debe ser valido")
    .custom(async (id) => {
      const comment = await CommentModel.findById(id);
      if (!comment) {
        throw new Error("El comentario no existe");
      }
      return true;
    }),
];

export const idArticleCommentValidation = [
  param("articleId")
    .isMongoId()
    .withMessage("El id no es válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El articulo no existe");
      }
      return true;
    }),
];

export const createCommentValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El campo de content es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("article")
    .isMongoId()
    .withMessage("El artículo debe ser un ID válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El article no existe");
      }
      return true;
    }),
];

export const updateCommentValidations = [
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de content es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("article")
    .optional()
    .isMongoId()
    .withMessage("El artículo debe ser un ID válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El article no existe");
      }
      return true;
    }),
];
// Asegurarse de que todas las rutas tengan validaciones consistentes:
// ● Validar ObjectIds recibidos tanto en el body como por params.
// ● Validar campos obligatorios con express-validator y esquemas Mongoose.
// ● Agregar validaciones personalizadas según cada modelo.

// Comment:
// ● content: 5-500 caracteres, obligatorio.
// ● author: ObjectId válido.
// ● article: ObjectId válido que debe existir.
