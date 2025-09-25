import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";

export const articleCreate = async (req, res) => {
  const { title, content, excerpt, status, author, tags } = req.body;
  try {
    const article = ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });

    return res.status(201).json({
      ok: true,
      message: "Artículo creado exitosamente",
      data: article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllArticles = async (_req, res) => {
  try {
    const articles = await ArticleModel.find();
    if (!articles) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro ningun articulo",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Usuarios encontrados",
      articles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getByIdArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro el artículo",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Articulo encontrado",
      article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    // const data = matchedData(req, {locations: ["body"]});
    const logueado = req.logeado;

    const myArticles = await ArticleModel.find({ author: logueado._id });
    if (!myArticles) {
      return res.status(404).json({
        ok: false,
        message: "No posees artículos",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Tus articulos",
      myArticles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateMyArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, status, tags } = req.body;
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        status,
        tags,
      },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({
        ok: false,
        message: "Artículo no encontrado",
      });
    }
    res.status(201).json({
      ok: true,
      message: "Articulo actualizado correctamente",
      updatedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({
        ok: false,
        message: "Artículo no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Articulo eliminado exitosamente",
      deletedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
// Articles:
// ● POST /api/articles → Crear artículo. (usuario autenticado) listo
// ● GET /api/articles → Listar artículos publicados con populate de author y tags. -> Faltan populates
// (usuario autenticado)
// ● GET /api/articles/:id → Obtener artículo por ID con populate completo. (usuario
// autenticado) -> faltan populates.
// ● GET /api/articles/my → Listar artículos del usuario logueado. (usuario autenticado) falta el match.
// ● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).falta el match
// ● DELETE /api/articles/:id → Eliminación física (solo autor o admin).listo
