function cambiar() {
    document.body.style.backgroundImage = 'url(./img/pared1.jpg)';
  }

  const getMovieHtml = movie =>{
      return `
      <div class="movie" onclick='getMovieDetailed(${movie.id})'>
          <div class='titulo'>
               <h2>${movie.title}</h2>
          <div>
          <div class='imgMovie'>  
                <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="imagen de la pelicula">
          <div>
      </div>
      `
  }

  const getMovieDetailedHtml = movie =>{
    return `
    <div class='movieDetails'>
        <div class="theMovie" onclick='getMovieDetailed(${movie.id})'>
            <div class='tituloDetails'>
                <h2>${movie.title}</h2>
            <div>
            <div class='details'>  
                <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="imagen de la pelicula">
                <div class='moreDetails'>
                    <span class='popularidad'>Popularidad:${movie.popularity}</span>
                    <p class='overview'>${movie.overview}</p>
                </div>
            </div>    
        </div>
    </div>    
    `
}


const getComingMovies = async() =>{
    try {
        const res= await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES');
        const movies = res.data.results;
        renderMovies(movies)   
    } catch (error) {
        console.error(error);
    }
   
}

const renderMovies = movies => {
    document.querySelector('main.movies').innerHTML =''
    for (const movie of movies){
        document.querySelector('main.movies').innerHTML += getMovieHtml(movie)
    }   
}

const getMovieDetailed = movie_id =>{
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES`)
    .then(res=>{
        const movie = res.data;
        document.querySelector('main.movies').innerHTML = getMovieDetailedHtml(movie)
    })
    .catch(console.error) //es lo mismo que escribir  error=>console.error(error)
}

const getPopularMovies = () =>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES')
    .then(res=>res.json())
    .then(res=>{
        const movies = res.results;
        renderMovies(movies);
    })
    .catch(error=>console.error(error))
}