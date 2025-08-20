import express from "express";
import { searchConcern } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchConcern);

export default router;
