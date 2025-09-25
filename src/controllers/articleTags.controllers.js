import { ArticleModel } from "../models/article.model.js";

export const agregarEtiquetaArticulo = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const newTaginArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: { tags: tagId },
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Etiqueta agregada al artículo",
      Article: newTaginArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const removerTagArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const deletedTagArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $pull: { tags: tagId },
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Etiqueta eliminada del articulo",
      ArticleTag: deletedTagArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
// Article Tags (relación N:M):
// ● POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo. (solo autor
// o admin)
// ● DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo. (solo
// autor o admin)
