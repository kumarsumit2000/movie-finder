let searchBtn = document.getElementById("searchButton");
let movieblock = document.getElementById("movieDetails");
let url = "https://imdb.iamidiotareyoutoo.com/search?q=";
searchBtn.addEventListener("click", () => {
  let movieName = document.getElementById("moviename").value;
  if (movieName.length <= 0) {
    alert("Please enter a movie name");
  } else {
    movieblock.innerHTML = "";
    async function Findmovie() {
      try {
        let result = await fetch(url + movieName);
        let res = await result.json();
        let movies = res.description;
        if(movies.length==0){
                alert("No movies found");

        }else
            {
                movies.forEach((element) => {
               let div = document.createElement("div");
            div.innerHTML = `
           <a href="${element['#IMDB_URL']}"; target="_blank";><div class="movies" style="background-image: url(${element['#IMG_POSTER']});">
            <div class="info">
            <div><h2 id="movieTitle">${element['#TITLE']}</h2></div>
            <div><span id="movieYear">${element['#YEAR']}</span>
            <span id="movieRating">${element['#RANK']}</span>
            </div>
            <div></div>
         </div>
         </div></a>`;
          movieblock.appendChild(div);
        });
    }
      } catch (error) {
        console.log("error found", error);
      }
    }
    Findmovie();
  }
});

// https://imdb.iamidiotareyoutoo.com/search?q=super%20man
