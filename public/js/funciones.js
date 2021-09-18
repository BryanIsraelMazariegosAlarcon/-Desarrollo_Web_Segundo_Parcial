var entrada = document.getElementById('buscar');
var caja = document.getElementById('caja_filtros');
var c = 0;
entrada.addEventListener('mouseover', mostrar_filtros, false);
caja.addEventListener('mouseover', mostrar_filtros, false);
entrada.addEventListener('mouseout', mostrar_filtros, false);
caja.addEventListener('mouseout', mostrar_filtros, false);

//mostrar filtros
function mostrar_filtros() {
    var caja = document.getElementById('caja_filtros');
    if (c == 0) {
        caja.style.display = 'block';
        c = 1;
    } else if (c == 1) {
        caja.style.display = 'none';
        c = 0;
    }
}

//lista de los generos

//aqui se obtiene los generos
var caja_select = document.getElementById('generos');
var i = 0;
fetch(
        genres_list_http +
        new URLSearchParams({
            api_key: api_key,
            language: "es",
        })
    )
    .then((res) => res.json())
    .then((data) => {
        data.genres.forEach((item) => {

            caja_select.innerHTML += `
        <option value="${item.id}_${item.name}">${item.name}</option>`;
            i++;
        });
    });

// aplicando genero
function aplicar_generos() {
    document.querySelector('.main').innerHTML = `<h1 class="heading">Pelis</h1>
    <p class="info">
      Las mejores pelis de la Red, series y cosas para quitar el tiempo, todo
      esta aqui
    </p>`;
    var valor = caja_select.value;
    var id_genero = valor.split('_', 2);
    fetchMovieListByGenres(id_genero[0], id_genero[1]);
}

//fecha
var caja_fecha = document.getElementById('fecha');
const agregar_fecha = () => {
    for (let i = 1925; i < 2021 + 1; i++) {
        caja_fecha.innerHTML += `
        <option value="${i}">${i}</option>`;
    }
};
agregar_fecha();

function aplicar_fecha() {
    console.log(data_original);
    document.querySelector('.main').innerHTML = `<h1 class="heading">Pelis</h1>
    <p class="info">
      Las mejores pelis de la Red, series y cosas para quitar el tiempo, todo
      esta aqui
    </p>`;
    var valor = document.getElementById("fecha").value;
    data_original.generos.forEach((item) => {

        fetch(api_base + generospelis + new URLSearchParams({
            api_key: api_key,
            with_genres: item.id,
            language: "es",
            primary_release_year: valor,
            page: Math.floor(Math.random() * 3) + 1
        })).then(res => res.json()).then(data => {
            makeCategoryElement(item.name, data.results);
        });
    });
}



//clasificacion
var div_categoriaa = document.getElementById('clasificacion');
const aplicar_clasificacion = () => {
    fetch('https://api.themoviedb.org/3/certification/movie/list?api_key=153474a6a2d2bbd467af8d2189312c3c')
        .then(res => res.json()).then(data => {
            data.certifications.US.forEach(item => {               
                div_categoriaa.innerHTML += `<option value="${item.certification}">${item.certification}</option>`;
            })
        })
}
aplicar_clasificacion();


//clasificacion
function aplicar_clasificacion2() {
    console.log(data_original);
    document.querySelector('.main').innerHTML = `<h2 class="heading">Películas Segun Clasificacion</h2>
    <p class="info">
    Las Películas Segun Su Clasificación, para quitar el tiempo, todo esta aqui
    </p>`;
    var valor = document.getElementById("clasificacion");

    data_original.generos.forEach((item) => {

        fetch(movie_genres_http + new URLSearchParams({
            api_key: api_key,
            with_genres: item.id,
            language: "es",
            certification_country: "US",
            certification: valor.value,
            page: Math.floor(Math.random() * 3) + 1
        })
        ).then(res => res.json()).then(data => {                        
                makeCategoryElement(item.name, data.results);
        });
    });
}

//series
function aplicar_serie() {
    console.log(data_original);
    document.querySelector('.main').innerHTML = `<h1 class="heading">Mejores Series de Television</h1>
    <p class="info">
      Las mejores series de television, para quitar el tiempo, todo esta aqui
    </p>`;
    var valor = document.getElementById("checkseries");

    data_original.generos.forEach((item) => {

        fetch(api_base + tv_genres_http + new URLSearchParams({
            api_key: api_key,
            with_genres: item.id,
            language: "es",
            page: Math.floor(Math.random() * 3) + 1
        })).then(res => res.json()).then(data => {
            if (valor.checked) {
                makeCategoryElement(item.name, data.results);
            } else {
                document.querySelector('.main').innerHTML = `<h1 class="heading">Pelis</h1>
            <p class="info">
              Las mejores pelis de la Red, series y cosas para quitar el tiempo, todo
              esta aqui
            </p>`;
                fetchMovieListByGenres(item.id, item.name);
            }
        });
    });
}

//+18 hotcake
function aplicar_peliculas18() {
    console.log(data_original);
    document.querySelector('.main').innerHTML = `<h1 class="heading">Las Películas Para Adultos +18 Mejor Calificadas</h1>
    <p class="info">
    Las Mejores Películas Para Adultos +18 Mejor Calificadas, para quitar el tiempo, todo esta aqui
    </p>`;
    var valor = document.getElementById("checkpeli18");

    data_original.generos.forEach((item) => {

        fetch(api_base + api_mejor_calificadas + new URLSearchParams({
            api_key: api_key,
            with_genres: item.id,
            include_adult: true,
            language: "es",
            page: Math.floor(Math.random() * 3) + 1
        })).then(res => res.json()).then(data => {
            if (valor.checked) {
                makeCategoryElement(item.name, data.results);
            } else {
                document.querySelector('.main').innerHTML = `<h1 class="heading">Pelis</h1>
            <p class="info">
              Las mejores pelis de la Red, series y cosas para quitar el tiempo, todo
              esta aqui
            </p>`;
                fetchMovieListByGenres(item.id, item.name);
            }
        });
    });
}