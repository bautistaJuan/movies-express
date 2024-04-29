async function pelis() {
  const data = await fetch("http://localhost:1234/movies");
  const json = await data.json();
  const main = document.querySelector("main");

  const mapMovies = json.map(movie => {
    const html = document.createElement("div");
    html.innerHTML = `
        <article data-id="${movie.id}">
         <h2>${movie.title}</h2>
         <img src="${movie.poster}" alt="${movie.title}">
         <p>${movie.year}</p>
         <button>Eliminar</button>
        </article>
    `;
    const deleteBtn = html.querySelector("button");
    deleteBtn.addEventListener("click", e => {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;
        fetch(`http://localhost:1234/movies/${id}`, {
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
