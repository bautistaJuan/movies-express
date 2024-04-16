import { moviesRouter } from "./routes/movies.js";
import { corsMidleware } from "./middlewares/cors.js";
import express, { json } from "express";

const app = express();
app.use(json());
app.use(corsMidleware());
app.disable("x-powered-by");

app.use("/movies", moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});
