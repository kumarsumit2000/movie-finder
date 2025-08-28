let searchBtn = document.getElementById("searchButton");
let clearBtn = document.getElementById("clearButton");
let movieblock = document.getElementById("movieDetails");
let loading = document.getElementById("loading");

let url = "https://imdb.iamidiotareyoutoo.com/search?q=";

searchBtn.addEventListener("click", () => {
  let movieName = document.getElementById("moviename").value.trim();
  if (movieName.length <= 0) {
    showMessage("⚠️ Please enter a movie name");
  } else {
    movieblock.innerHTML = "";
    loading.classList.remove("hidden");

    async function Findmovie() {
      try {
        let result = await fetch(url + movieName);
        let res = await result.json();
        let movies = res.description;

        loading.classList.add("hidden");

        if (movies.length == 0) {
          showMessage("❌ No movies found");
        } else {
          movies.forEach((element) => {
            let div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
              <a href="${element['#IMDB_URL']}" target="_blank">
                <img src="${element['#IMG_POSTER']}" alt="${element['#TITLE']}" class="poster"/>
                <div class="card-info">
                  <h2>${element['#TITLE']}</h2>
                  <p>📅 ${element['#YEAR'] || "N/A"}</p>
                  <p>⭐ Rank: ${element['#RANK'] || "N/A"}</p>
                </div>
              </a>`;
            movieblock.appendChild(div);
          });
        }
      } catch (error) {
        loading.classList.add("hidden");
        showMessage("⚠️ Error fetching data. Try again later.");
        console.log("error found", error);
      }
    }
    Findmovie();
  }
});

clearBtn.addEventListener("click", () => {
  document.getElementById("moviename").value = "";
  movieblock.innerHTML = "";
});

function showMessage(msg) {
  movieblock.innerHTML = `<div class="message">${msg}</div>`;
}
