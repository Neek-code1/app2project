const API_KEY = "245f7f2a";

const BASE_URL = "https://www.omdbapi.com/";

async function searchMovies(movieName) {

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(
      data.Error || "No movies found."
    );
  }

  return data.Search || [];
}


async function getMovieDetails(imdbID) {

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(
      data.Error || "Movie details not found."
    );
  }

  return data;
}