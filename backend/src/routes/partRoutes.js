// backend/src/routes/partRoutes.js
import express from "express";
import { getAllParts, createPart } from "../controllers/partController.js";

const router = express.Router();

router.get("/", getAllParts);
router.post("/", createPart);

export default router;
