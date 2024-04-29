async function pelis() {
  // Para probarlo localmente
  // const data = await fetch("http://localhost:1234/movies");
  const data = await fetch(
    "https://movies-express-dev-mqkq.3.us-1.fl0.io/movies/"
  );
  const json = await data.json();
  const main = document.querySelector("main");

  const mapMovies = json.map(movie => {
    const html = document.createElement("div");
    html.innerHTML = `
        <article data-id="${movie.id}">
         <h2>${movie.title}</h2>
         <img src="${movie.poster}" alt="${movie.title}" class="img-movie">
         <p>${movie.year}</p>
         <button>Eliminar</button>
        </article>
    `;
    const deleteBtn = html.querySelector("button");
    deleteBtn.addEventListener("click", e => {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;
        fetch(`https://movies-express-dev-mqkq.3.us-1.fl0.io/movies/${id}`, {
          method: "DELETE",
        }).then(res => {
          if (res.ok) {
            article.remove();
          }
        });
      }
    });
    main.appendChild(html);
  });
}
pelis();
