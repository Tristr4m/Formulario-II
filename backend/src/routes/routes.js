import { Router } from "express";
// Importamos todos los controladores necesarios una sola vez
import { createUser, createUserIIE } from "../controllers/controllers.js";

const router = Router();

// --- RUTAS PARA DOCENTES (Tabla IID) ---
router.post("/usuario", createUser);
//router.get("/usuario", getUsers);

// --- RUTAS PARA ESTUDIANTES (Tabla IIE) ---
router.post("/usuario-iie", createUserIIE);

export default router;