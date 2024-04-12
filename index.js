const express = require("express");
const crypto = require("node:crypto");
const app = express();
app.use(express.json());
app.disable("x-disable-by");
/*
  para esta opción se debe instalar la dependencia: npm install cors -E
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

*/
const movies = require("./movies.json");
const validateMovie = require("./validateMovie");

const ACCEPTED_ORIGIN = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:5050",
  "http://localhost:7373",
];

app.get("/", (req, res) => {
  res.send("<h1 style='color:red'>Hi !</h1>");
});

// Todos los recursos se Identifican con /movies
app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  // Para que todos los dominios puedan acceder a las peliculas
  // res.header("Access-Control-Allow-Origin", "*"); O especificar el dominio al que permitimos
  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  }
  // en caso de que busquen x genre(genero)
  const { genre } = req.query;
  if (genre) {
    const moviesFilterForGenre = movies.filter(movie =>
      // recorre el array y retorna true si existe en genero que buscamos, la pelicula
      movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    );
    return res.json(moviesFilterForGenre);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);

  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie Not Found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie.validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // Esto inserta una nueva pelicula con un id creado con crypto
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // No es REST porque guardamos el estado de la aplicacion en memoria
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  // El req.body contiene los datos que queremos actualizar
  // Lo validamos en validatePartialMovie
  const result = validateMovie.validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) });
  }

  // Traemos el id de la pelicula que queremos actualizar
  const { id } = req.params;
  // Esto devuelve el indice de donde se encuentre la pelicula
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    // La pelicula que coincide con el id del req.params, con tus respectivos datos
    // Adentro!...
    ...movies[movieIndex],
    // Actualizamos
    ...result.data,
  };
  // Dentro del array vamos al indice que necesitamos y reemplazamos con los nuevos datos
  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  const origin = req.header("origin");

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  }
  // Recuperamos el ID
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
