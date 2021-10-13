/*
    Rutas de Usuarios / Auth
    host + /api/users
*/
const { Router } = require("express");
const { check } = require("express-validator");
//JS
const { getAll, create, login } = require("../controller/usersController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear usuario
router.post(
  "/create",
  [
    // middlewares
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    //Se validan los campos del request
    validarCampos,
  ],
  //Se manda a crear el usuario
  create
);

//Consultar usuarios
router.get("/getAll", getAll);

//Ruta para iniciar sesión
router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  login
);

module.exports = router;
