// backend/src/routes/partRoutes.js
import express from "express";
import {
    createPart,
    getAllParts,
    getPartById,
    updatePart,
    addPartOrder, // <-- import new handler
    getLowStockParts
} from "../controllers/partController.js";

const router = express.Router();

router.post("/", createPart);
router.get("/", getAllParts);
router.get("/low-stock", getLowStockParts);
router.get("/:id", getPartById);
router.put("/:id", updatePart);


//record purchase order & increase stock
router.post("/:id/order", addPartOrder);

export default router;