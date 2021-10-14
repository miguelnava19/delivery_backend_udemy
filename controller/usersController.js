const { response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//JS
const User = require("../model/user");
const constant = require("../util/constants");
const { generarJWT } = require("../helpers/jwt");

const getAll = async (req, res, next) => {
  try {
    const data = await User.getAll();
    
    return res.status(constant.CODE_SUCCESS).json(data);
  } catch (error) {
    console.error(`error getAll usuarios --> ${error}`);
    return res.status(constant.CODE_INTERNAL_SERVER).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error,
    });
  }
};

const create = async (req, res, next) => {
  try {
    const user = req.body;
    const data = await User.create(user);
    res.status(constant.CODE_CREATED).json({
      success: true,
      message: `Usuario registrado correctamente`,
      data: data.id,
    });
  } catch (e) {
    console.error(`error create usuarios --> ${e}`);
    return res.status(constant.CODE_INTERNAL_SERVER).json({
      success: false,
      message: "Error al crear usuarios",
      error: e,
    });
  }
};

const login = async (req, res = response, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(constant.CODE_BAD_REQUEST).json({
        success: false,
        message: "El correo o contraseña incorrecto.",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(constant.CODE_BAD_REQUEST).json({
        success: false,
        message: "El correo o contraseña incorrecto.",
      });
    }
    // Generar JWT
    const token = await generarJWT(user.id, user.email);

    const data = {
      id: user.id,
      name: user.nombre,
      lastname: user.apellido,
      session_token: `${token}`,
    };

    return res.status(constant.CODE_SUCCESS).json({
      success: true,
      message: "Login success",
      data,
    });
  } catch (e) {
    console.error(`error login --> ${e}`);
    return res.status(constant.CODE_INTERNAL_SERVER).json({
      success: false,
      message: "Ocurrión un error, intententelo más tarde.",
      error: e,
    });
  }
};

module.exports = {
  create,
  login,
  getAll,
};
