import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(1),
  poster: z.string().url({ message: "Poster must be a valid URL" }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Sci-Fi",
      "Horror",
      "Documental",
      "Thriller",
    ]),
    {
      required_error: "Movie genre is required.",
      invalid_type_error: "Movie genre must be an array enum Genre",
    }
  ),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}
export function validatePartialMovie(object) {
  // Lo que indicamos aqui es que todas las opciones (con .partial() ) son opcionales
  // Pero si llega algun parametro que coincida con alguno de los valores del objeto
  // Lo debe validar como se debe
  return movieSchema.partial().safeParse(object);
}

// module.exports = { validateMovie, validatePartialMovie };
