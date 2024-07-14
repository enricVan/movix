import express from "express";
import {
  writeHistory,
  getHistory,
  deleteMovieFromHistory,
  clearHistory
} from "../controllers/historyController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:movieId", authenticate, writeHistory);

router.get("/", authenticate, getHistory);

router.delete("/:movieId", authenticate, deleteMovieFromHistory);

router.delete("/", authenticate, clearHistory);

export default router;
