import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      profile: data.profile,
    });
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al registrar usuario", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = generateToken({
      id: user.id,
      name: user.profile.first_name,
      lastname: user.profile.last_name,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });
    return res.json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout exitoso" });
};
