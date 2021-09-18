var data_original = {
    generos: []
};

var d = 0;

fetch(genres_list_http + new URLSearchParams({
        api_key: api_key,
        language: "es"                              //PARA COLOCARLO EN ESPANOL
    }))
    .then(res => res.json()).then(data => {
        data.genres.forEach(item => {
            data_original.generos[d] = {
                id: item.id,
                name: item.name
            };
            console.log(item);
            //console.table(item);
            fetchMovieListByGenres(item.id, item.name);
            d++;
        })
    })

const fetchMovieListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
            api_key: api_key,
            with_genres: id,
            language: "es",                         //PARA COLOCARLO EN ESPANOL
            page: Math.floor(Math.random() * 3) + 1
        })).then(res => res.json()).then(data => {
            makeCategoryElement(`${genres}`, data.results);
        })
        .catch(err => console.log(err));
}

const main = document.querySelector('.main');

const makeCategoryElement = (category, data) => {
    main.innerHTML += `<div class="movie-list">
    <button class="pre-btn"><img src="img/pre.png" alt="" /></button>
    <h1 class="movie-category">${category.split('_').join(' ')}</h1>
    <div class="movie-container" id="${category}">
      
    </div>
    <button class="nxt-btn">
      <img src="img/nxt.png" alt="" />
    </button>
  </div>`;
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }
        if (item.title == null) {
            item.title = item.name
        }
        movieContainer.innerHTML += `<div class="movie" onclick="location.href = '/${item.id}'">
        <img src="${img_url}${item.backdrop_path}" alt="" />
        <p class="movie-title">${item.title}</p>
      </div>
        `;
        if (i == data.length - 1) {
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
    })

}