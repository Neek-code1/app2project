// ========================================
// CINEFIND API FUNCTIONS
// ========================================


// PUT YOUR OMDb API KEY HERE
const API_KEY = "YOUR_API_KEY_HERE";


// OMDb API URL
const BASE_URL =
  "https://www.omdbapi.com/";


// ========================================
// SEARCH MOVIES
// ========================================

async function searchMovies(movieName) {

  try {

    const response =
      await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
      );


    if (!response.ok) {

      throw new Error(
        "Unable to connect to movie database."
      );

    }


    const data =
      await response.json();


    if (data.Response === "False") {

      throw new Error(
        data.Error || "No movies found."
      );

    }


    return data.Search;


  } catch (error) {

    console.error(
      "Movie Search Error:",
      error
    );


    throw error;

  }

}



// ========================================
// GET INDIVIDUAL MOVIE DETAILS
// ========================================

async function getMovieDetails(imdbID) {

  try {

    const response =
      await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );


    if (!response.ok) {

      throw new Error(
        "Unable to load movie details."
      );

    }


    const data =
      await response.json();


    if (data.Response === "False") {

      throw new Error(
        data.Error ||
        "Movie information not found."
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Movie Details Error:",
      error
    );


    throw error;

  }

}