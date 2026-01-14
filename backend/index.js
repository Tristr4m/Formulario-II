import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./src/routes/routes.js";

const app = express(); 

const allowedOrigins = [
  "http://127.0.0.1:5500", 
  "https://formulario-ii.onrender.com",
  "https://formulario-ii-estudiantes.onrender.com" 
];
/*
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));
*/
app.use(cors());
app.use(express.json());
app.use("/usuarios", routes);

// ... (resto de tus importaciones y código)

// USAR EL PUERTO DE LA NUBE (IMPORTANTE)
const port = process.env.PORT || 2000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});