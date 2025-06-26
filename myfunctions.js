//Api Key
const tmdbKey = '45e0f905f1eb10a7c4df04db401faf10';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list' ;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if(response.ok){

      const jsonResponse = await response.json() 
      console.log("jsonResponse completo recibido de TMDB:", jsonResponse);

      //Saves genres property to facilitate working with it
      const genres = jsonResponse.genres;
      //return the property genres of TMDB
      return genres;         
    }
  } catch(error){
    console.log(error);
  }
};


//Gets random movie form genres options
const getMovies = async () => {
  //Variables to get random movie
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}` ;

  //Puts together the URL where we send our fetch request
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try{
    //Sends a GET request
    const response = await fetch(urlToFetch);

    if(response.ok){
      //converting the data to json
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //Saving results to make it easy to use
      const movies = jsonResponse.results;
      return movies;
    }
  } catch(error){
    console.log(error);
  }
};


const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`
  //Assmabling the url of this function
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try{
    //Send a Get request to get movie info
    const response = await fetch(urlToFetch);

    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  }catch(error){
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
const movies = await getMovies();
const randomMovie = getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = show
