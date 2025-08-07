import express from "express";
import { getAllInvoices } from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getAllInvoices);

export default router;
