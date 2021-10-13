const { response } = require("express");
const { validationResult } = require("express-validator");
const constant = require("../util/constants");

//middlewarw que valida el request
const validarCampos = (req, res = response, next) => {
  // manejo de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(constant.CODE_BAD_REQUEST).json({
      success: false,
      message: "Campos obligatorios",
      error: errors.mapped(),
    });
  }
  //Si el req es válido avanza
  next();
};

module.exports = {
  validarCampos,
};
