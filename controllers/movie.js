import { MovieModel } from "../models/local-file-system/movie.js";
import { validateMovie, validatePartialMovie } from "../validateMovie.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });

    if (movie) return res.json(movie);

    res.status(404).json({ message: "Movie Not Found" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await MovieModel.delete({ id });
    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({ message: "Movie deleted" });
  }

  static async upDateMovie(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const upDateMovie = await MovieModel.upDate({ id, input: result.data });

    return res.json(upDateMovie);
  }
}
