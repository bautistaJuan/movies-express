## Como leer un json en ESModules

### Con fs y JSON.parse() :

```javascript
import fs from "node:fs";
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
```

### Como leer un json en ESModules recomendado

<p>Creando nuestro propio require:</p>

```javascript
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const movies = require("../movies.json");
```

# :rotating_light: Problema de CORS, agregando dominios permitidos

### para esta opción se debe instalar la dependencia :

```bash
npm install cors -E
```

```javascript
import cors from "cors";

const app = express();

app.use(json());

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:1234",
        "https://movies.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
```
