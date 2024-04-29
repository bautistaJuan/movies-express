import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "#passWord01",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    // Esto devuelve una tupla, los datos y datos de la tabla
    const [movies] = await connection.query(
      "SELECT title, published, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;"
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      "SELECT title, published, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)",
      [id]
    );
    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const { title, year, duration, director, rate, poster } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, published, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (e) {
      throw new Error("Error creating movie");
    }

    const [movies] = await connection.query(
      `SELECT title, published, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {}

  static async upDate({ id, input }) {}
}
