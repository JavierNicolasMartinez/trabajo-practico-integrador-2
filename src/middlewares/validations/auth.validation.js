import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El campo de username no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .custom(async (value) => {
      const usernameUnico = await UserModel.findOne({
        where: { username: value },
      });
      if (usernameUnico) {
        throw new Error("El username ya existe");
      }
    }),
  body("email")
    .trim()
    .isEmail()
    .withMessage("El email debe estar en formato de email")
    .isLength({ max: 100 })
    .withMessage("El email debe tener al un maximos de 100 caracteres ")
    .notEmpty()
    .withMessage("El campo de email no debe estar vacío")
    .custom(async (value) => {
      const emailUnico = await UserModel.findOne({
        where: { email: value },
      });
      if (emailUnico) {
        throw new Error("El email ya existe");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo de password no puede estar vacío")
    .isLength({ min: 8, max: 255 })
    .withMessage("La contraseña debe tener al menos 8 caracteres y maximo 255")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("El campo de role no puede estar vacío")
    .isIn(["user", "admin"])
    .withMessage("El role debe ser 'user' o 'admin'"),
  //   body("first_name")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("El campo de first_name no puede estar vacío")
  //     .isLength({ min: 2, max: 50 })
  //     .withMessage(
  //       "El campo first_name no puede tener menos de 2 caracteres ni más de 50"
  //     )
  //     .isAlpha("es-ES", { ignore: " " })
  //     .withMessage("En el campo de first_name solo pueden ir letras"), //Función buscada en documentación, fijarse por las dudas la especificación de idioma.

  //   body("last_name")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("El campo de last_name no puede estar vacío")
  //     .isLength({ min: 2, max: 50 })
  //     .withMessage(
  //       "El campo last_name no puede tener menos de 2 caracteres ni más de 50"
  //     )
  //     .isAlpha("es-ES", { ignore: " " })
  //     .withMessage("En el campo de last_name solo pueden ir letras"),

  //   body("biography")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("El campo de biography no puede estar vacío")
  //     .isLength({ max: 500 })
  //     .withMessage("La biography no puede superar los 500 caracteres."),

  //   body("avatar_url")
  //     .optional()
  //     .isURL()
  //     .withMessage("El avatar debe ser un URL valido"),
];
