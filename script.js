const renderMovies = movies => {
    for (const movie of movies){
        document.querySelector('main.movies').innerHTML+=`
        <div class="movie">
             <h2>${movie.title}</h2>
             <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="">
        </div>
        `
    }
    
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