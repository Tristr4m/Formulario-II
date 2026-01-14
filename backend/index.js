import cors from "cors"
import express  from "express"
import routes from "./src/routes/routes.js"


const app = express(); 
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

app.use("/usuarios", routes);

app.listen(2000, ()=>{
    console.log("Servidor corriendo en el puerto 2000")
})