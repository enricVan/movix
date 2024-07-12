import express from "express";
const router = express.Router();

import {
  addMovieToFavorites,
  removeMovieFromFavorites,
  showFavorites,
  removeAllMoviesFromFavorites
} from "../controllers/favoriteController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.route("/").get(authenticate, showFavorites);
router.route("/:movieId").post(authenticate, addMovieToFavorites);
router.route("/").delete(authenticate, removeAllMoviesFromFavorites);
router.route("/:movieId").delete(authenticate, removeMovieFromFavorites);

export default router;