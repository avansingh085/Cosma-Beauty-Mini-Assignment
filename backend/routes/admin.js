import express from "express";
import { listEnquiries } from "../controllers/adminController.js";

const router = express.Router();

router.get("/enquiries", listEnquiries);

export default router;
