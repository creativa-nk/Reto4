function backgroundAzul() {
    document.body.style.backgroundImage = 'url(./img/multiAzul.jpg)';
  }

 function backgroundAmarillo() {
    document.body.style.backgroundImage = 'url(./img/multiAmarillo.jpg)';
  }   

  const getMovieHtml = movie =>{
      return `
        <div class="movie" onclick='getMovieDetailed(${movie.id})'>
            
            <div class='titulo'>
                <h2>${movie.title}</h2>
            <div>
            <div class='imgMovie'>  
                <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="imagen de la pelicula">
                    <div class='average'>
                         <p>${movie.vote_average}</p>
                     </div>
            <div>
        </div>
      `
  }

 /*  <span class='popularidad'>Popularidad:${movie.popularity}</span>
     <p class='countries'>${movie.production_countries}</p> */



  const getMovieDetailedHtml = movie =>{
    let genres = []
    movie.genres.map(genre => genres.push(genre.name));
    let age = []
    movie.genres.map(genre => genres.push(genre.))

     return `
            <div class='movieDetails'>
                <div class="theMovie" onclick='getMovieDetailed(${movie.id})'>
                    <div class='tituloDetails'>
                        <h2>${movie.title}</h2>
                    <div>
                    <div class='details'>  
                        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="imagen de la pelicula">
                        <div class='moreDetails'>

                            <h3 class='originalTitle'>${movie.original_title}<span>(${movie.release_date})</span></h3>
                            <p class='genres'>${genres.join(', ')}</p>
                            <ul class='ulDetails'>                               
                                <li>idioma original: ${movie.original_language}</li>
                                <li>${movie.runtime} min</li>
                                <li class='averageDetails'>${movie.vote_average}</li>
                            </ul>    
                            
                            <p class='overview'>
                                <h4> Sinopsis:</h4> ${movie.overview}</p>
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
        document.body.style.backgroundImage = 'url(./img/multiRojo.jpg)';
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