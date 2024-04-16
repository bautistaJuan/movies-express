import { Router } from "express";
import { MovieController } from "../controllers/movie.js";

export const moviesRouter = Router();
const ACCEPTED_ORIGIN = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:5050",
  "http://localhost:7373",
];
moviesRouter.options("/:id", (req, res) => {
  const origin = req.header("origin");

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  }
  res.sendStatus(200);
});

moviesRouter.get("/", MovieController.getAll);
moviesRouter.post("/", MovieController.create);

moviesRouter.get("/:id", MovieController.getById);
moviesRouter.delete("/:id", MovieController.delete);
moviesRouter.patch("/:id", MovieController.upDateMovie);
