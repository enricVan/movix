// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

// Configuration
dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/history", historyRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use(
  "/backend/uploads",
  express.static(path.join(__dirname + "/backend/uploads"))
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
