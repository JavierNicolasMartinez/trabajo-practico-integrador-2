export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ Message: "Solo un admin puede hacer esta acción" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
