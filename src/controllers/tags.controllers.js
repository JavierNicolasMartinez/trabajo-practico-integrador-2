import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const tag = TagModel.create({
      name,
      description,
    });

    res.status(201).json({
      ok: true,
      message: "Etiqueta creada con exito",
      data: tag,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllTags = async (_req, res) => {
  try {
    const tags = await ArticleModel.find();

    if (!tags) {
      return res.status(404).json({
        ok: false,
        message: "Etiquetas no encontradas",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Etiquetas encontradas",
      tags,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
export const getByIdTag = async (req, res) => {
  const { id } = req.params;
  try {
    const oneTag = await TagModel.findById(id).populate("Article");

    if (!oneTag) {
      return res.status(404).json({
        ok: false,
        message: "Etiqueta no encontrada",
      });
    }
    res.status(200).json({
      ok: true,
      message: "La etiqueta fue encontrada con exito",
      oneTag,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updateTag) {
      return res.status(404).json({
        ok: false,
        message: "No se encontra la etiqueta",
      });
    }

    res.status(201).json({
      ok: true,
      message: "Etiqueta actualizada",
      updatedTag,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await TagModel.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro la etiqueta",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Etiqueta eliminada exitosamente",
      deletedTag,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Tags:
// ● POST /api/tags → Crear etiqueta (solo admin). listo
// ● GET /api/tags → Listar todas las etiquetas. (usuario autenticado) listo
// ● GET /api/tags/:id → Obtener etiqueta con populate de artículos asociados (usuario
// autenticado).
// ● PUT /api/tags/:id → Actualizar etiqueta (solo admin). Cambiar por el match
// ● DELETE /api/tags/:id → Eliminar etiqueta (solo admin).
