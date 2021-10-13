const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Crear el servidor de express
const app = express();

app.use(logger("dev"));

// Lectura y parseo del body
app.use(express.json());

// CORS
app.use(cors());
app.disable("x-powered-by");

//Rutas
app.use("/api/users", require("./routes/userRoutes"));

// Escuchar peticiones
app.listen(port, () => {
  console.info("Application nodejs ", process.pid, " iniciada... port ", port);
});
