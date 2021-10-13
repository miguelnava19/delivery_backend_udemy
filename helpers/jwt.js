const jwt = require("jsonwebtoken");
//ENV
const dotenv = require("dotenv");
dotenv.config();

//Función que crea el token
const generarJWT = (id, email) => {
  //Se realiz ala promesa
  return new Promise((resolve, reject) => {
    const payload = { id, email };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
