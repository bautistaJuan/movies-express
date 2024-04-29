# Curso de `NodeJS`.

- Contenido visto
  - MVC
  - Express.JS
  - API REST
  - CORS
  - MySQL

## Cree mi propia API REST y la subo a `FL0`

```javascript
### Recupera todas las peliculas
GET  http://localhost:1234/movies

### Recuperar una pelicula por su id
GET  http://localhost:1234/movies/dd015ecf-fc4b-11ee-92a9-7478271330a0

GET  http://https://movies-express-dev-mqkq.3.us-1.fl0.io/movies?genre=drama

### Crear una pelicula
POST http://https://movies-express-dev-mqkq.3.us-1.fl0.io/movies
Content-Type: application/json

  {
    "title": "El coco arrepentio",
    "year": 1994,
    "director": "Frank Darabont",
    "duration": 142,
    "poster": "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
    "genre": [
      "Drama"
    ],
    "rate": 9.3

  }

### Para actualizar ls datos de una pélicula
PATCH  http://https://movies-express-dev-mqkq.3.us-1.fl0.io/movies/f637af41-cbeb-49b3-8d62-268d4c7fbbf5
Content-Type: application/json

{
    "title": "Gladiador pt. 12"
}
### Para eliminar una pelicula por id
DELETE  http://https://movies-express-dev-mqkq.3.us-1.fl0.io/movies/f637af41-cbeb-49b3-8d62-268d4c7fbbf5
Content-Type: application/json
```

`Nota:`
