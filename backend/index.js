import cors from "cors";
import express from "express";
import routes from "./src/routes/routes.js";

const app = express(); 

const allowedOrigins = [
  "http://127.0.0.1:5500", 
  "https://formulario-ii.onrender.com",
  "https://formulario-ii-estudiantes.onrender.com" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());
app.use("/usuarios", routes);

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});