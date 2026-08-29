import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "YOUR_API_KEY_HERE";
const BASE_URL = "https://www.omdbapi.com/";

async function searchMovies(movieName) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
  );

  if (!response.ok) {
    throw new Error("Unable to connect to movie database.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data.Search || [];
}

async function getMovieDetails(imdbID) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
  );

  if (!response.ok) {
    throw new Error("Unable to load movie details.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie information not found.");
  }

  return data;
}


// ========================================
// NAVBAR
// ========================================

function Navbar({ goHome }) {

  return (

    <nav className="navbar">

      <div className="container navbar-container">


        <button
          className="logo"
          onClick={goHome}
        >

          Cine<span>Find</span>

        </button>


        <div className="nav-links">

          <button
            onClick={goHome}
          >
            Home
          </button>

        </div>


      </div>

    </nav>

  );

}



// ========================================
// HERO / SEARCH SECTION
// ========================================

function Hero({
  searchInput,
  setSearchInput,
  handleSearch
}) {

  return (

    <section className="hero">

      <div className="container">


        <p className="section-label">

          DISCOVER MOVIES

        </p>


        <h1>

          Find Your Next

          <span>
            {" "}Favorite Movie
          </span>

        </h1>


        <p className="hero-description">

          Search thousands of movies,
          discover movie information,
          ratings, actors, directors,
          and more.

        </p>



        <form
          className="search-form"
          onSubmit={handleSearch}
        >


          <input

            type="text"

            placeholder=
              "Search for a movie..."

            value={searchInput}

            onChange={
              (event) =>
                setSearchInput(
                  event.target.value
                )
            }

          />


          <button type="submit">

            Search

          </button>


        </form>


      </div>

    </section>

  );

}



// ========================================
// MOVIE CARD
// ========================================

function MovieCard({
  movie,
  openMovie
}) {


  const poster =

    movie.Poster !== "N/A"

      ? movie.Poster

      : "https://placehold.co/400x600?text=No+Poster";


  return (

    <article className="movie-card">


      <div className="poster-container">


        <img

          src={poster}

          alt={`${movie.Title} movie poster`}

          className="movie-poster"

        />


        <div className="poster-overlay">


          <button
            onClick={() =>
              openMovie(movie.imdbID)
            }
          >

            View Details

          </button>


        </div>


      </div>



      <div className="movie-card-info">


        <h3>

          {movie.Title}

        </h3>


        <div className="movie-card-bottom">


          <span>

            {movie.Year}

          </span>


          <span className="movie-type">

            {movie.Type}

          </span>


        </div>


      </div>


    </article>

  );

}



// ========================================
// MOVIE LIST
// ========================================

function MovieList({
  movies,
  loading,
  error,
  searchTerm,
  sortOrder,
  setSortOrder,
  openMovie
}) {


  let sortedMovies =
    [...movies];



  // NEWEST FIRST

  if (sortOrder === "newest") {

    sortedMovies.sort(
      (a, b) => {

        const yearA =
          parseInt(a.Year) || 0;

        const yearB =
          parseInt(b.Year) || 0;

        return yearB - yearA;

      }
    );

  }



  // OLDEST FIRST

  if (sortOrder === "oldest") {

    sortedMovies.sort(
      (a, b) => {

        const yearA =
          parseInt(a.Year) || 0;

        const yearB =
          parseInt(b.Year) || 0;

        return yearA - yearB;

      }
    );

  }



  // ALPHABETICAL

  if (sortOrder === "az") {

    sortedMovies.sort(
      (a, b) =>
        a.Title.localeCompare(
          b.Title
        )
    );

  }



  return (

    <section className="movies-section">

      <div className="container">


        <div className="movies-heading">


          <div>

            <p className="section-label">

              SEARCH RESULTS

            </p>


            <h2>

              {searchTerm

                ? `Movies for "${searchTerm}"`

                : "Popular Movies"
              }

            </h2>

          </div>



          <div className="sort-container">


            <label htmlFor="sort">

              Sort by

            </label>


            <select

              id="sort"

              value={sortOrder}

              onChange={
                (event) =>
                  setSortOrder(
                    event.target.value
                  )
              }

            >


              <option value="default">

                Default

              </option>


              <option value="newest">

                Year: Newest

              </option>


              <option value="oldest">

                Year: Oldest

              </option>


              <option value="az">

                Title: A - Z

              </option>


            </select>


          </div>


        </div>



        {/* LOADING */}


        {loading && (

          <div className="loading-area">


            <div className="loader">
            </div>


            <p>

              Finding movies...

            </p>


          </div>

        )}



        {/* ERROR */}


        {!loading && error && (

          <div className="error-message">


            <h3>

              No movies found

            </h3>


            <p>

              {error}

            </p>


          </div>

        )}



        {/* MOVIES */}


        {!loading &&
          !error &&
          sortedMovies.length > 0 && (

          <div className="movie-grid">


            {sortedMovies.map(
              (movie) => (

                <MovieCard

                  key={
                    movie.imdbID
                  }

                  movie={
                    movie
                  }

                  openMovie={
                    openMovie
                  }

                />

              )
            )}


          </div>

        )}


      </div>

    </section>

  );

}



// ========================================
// MOVIE DETAILS PAGE
// ========================================

function MovieDetails({
  movie,
  loading,
  error,
  goHome
}) {


  if (loading) {

    return (

      <section className="details-message">


        <div className="loader">
        </div>


        <p>

          Loading movie details...

        </p>


      </section>

    );

  }



  if (error) {

    return (

      <section className="details-message">


        <h2>

          Unable to load movie

        </h2>


        <p>

          {error}

        </p>


        <button
          onClick={goHome}
          className="primary-btn"
        >

          Back Home

        </button>


      </section>

    );

  }



  if (!movie) {

    return null;

  }



  const poster =

    movie.Poster !== "N/A"

      ? movie.Poster

      : "https://placehold.co/400x600?text=No+Poster";



  return (

    <section className="details-page">

      <div className="container">


        <button
          className="back-button"
          onClick={goHome}
        >

          ← Back to Movies

        </button>



        <div className="movie-details">


          <div className="details-poster-container">


            <img

              src={poster}

              alt={`${movie.Title} poster`}

              className="details-poster"

            />


          </div>



          <div className="details-information">


            <p className="section-label">

              MOVIE DETAILS

            </p>


            <h1>

              {movie.Title}

            </h1>



            <div className="movie-tags">


              <span>

                {movie.Year}

              </span>


              <span>

                {movie.Rated}

              </span>


              <span>

                {movie.Runtime}

              </span>


              <span>

                {movie.Genre}

              </span>


            </div>



            <div className="rating">

              ⭐

              <strong>

                {movie.imdbRating}

              </strong>

              <span>

                / 10 IMDb

              </span>

            </div>



            <p className="movie-plot">

              {movie.Plot}

            </p>



            <div className="movie-information">


              <div>

                <span className="info-title">

                  Director

                </span>


                <span>

                  {movie.Director}

                </span>

              </div>



              <div>

                <span className="info-title">

                  Actors

                </span>


                <span>

                  {movie.Actors}

                </span>

              </div>



              <div>

                <span className="info-title">

                  Released

                </span>


                <span>

                  {movie.Released}

                </span>

              </div>



              <div>

                <span className="info-title">

                  Language

                </span>


                <span>

                  {movie.Language}

                </span>

              </div>



              <div>

                <span className="info-title">

                  Country

                </span>


                <span>

                  {movie.Country}

                </span>

              </div>



              <div>

                <span className="info-title">

                  Awards

                </span>


                <span>

                  {movie.Awards}

                </span>

              </div>


            </div>


          </div>


        </div>


      </div>

    </section>

  );

}



// ========================================
// FOOTER
// ========================================

function Footer() {

  return (

    <footer className="footer">

      <div className="container">


        <div className="footer-logo">

          Cine<span>Find</span>

        </div>


        <p>

          Find your next favorite movie.

        </p>


        <p className="copyright">

          © {new Date().getFullYear()}
          {" "}CineFind

        </p>


      </div>

    </footer>

  );

}



// ========================================
// MAIN APP
// ========================================

function App() {


  const [page, setPage] =
    useState("home");


  const [searchInput, setSearchInput] =
    useState("Batman");


  const [searchTerm, setSearchTerm] =
    useState("Batman");


  const [movies, setMovies] =
    useState([]);


  const [selectedMovie, setSelectedMovie] =
    useState(null);


  const [sortOrder, setSortOrder] =
    useState("default");


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");



  // ========================================
  // LOAD STARTING MOVIES
  // ========================================


  useEffect(() => {

    loadMovies("Batman");

  }, []);



  // ========================================
  // SEARCH
  // ========================================


  async function loadMovies(movieName) {


    try {


      setLoading(true);

      setError("");


      const results =
        await searchMovies(
          movieName
        );


      setMovies(results);


    } catch (error) {


      setMovies([]);


      setError(
        error.message
      );


    } finally {


      setLoading(false);


    }


  }



  // ========================================
  // SEARCH FORM
  // ========================================


  function handleSearch(event) {


    event.preventDefault();


    const cleanedSearch =
      searchInput.trim();


    if (!cleanedSearch) {


      setError(
        "Please type a movie title."
      );


      return;

    }


    setSearchTerm(
      cleanedSearch
    );


    setSortOrder(
      "default"
    );


    loadMovies(
      cleanedSearch
    );

  }



  // ========================================
  // OPEN DETAILS
  // ========================================


  async function openMovie(imdbID) {


    try {


      setPage(
        "details"
      );


      setLoading(true);


      setError("");


      window.scrollTo(
        0,
        0
      );


      const movie =
        await getMovieDetails(
          imdbID
        );


      setSelectedMovie(
        movie
      );


    } catch (error) {


      setError(
        error.message
      );


    } finally {


      setLoading(false);


    }


  }



  // ========================================
  // BACK HOME
  // ========================================


  function goHome() {


    setPage(
      "home"
    );


    setError("");


    window.scrollTo(
      0,
      0
    );

  }



  return (

    <div className="app">


      <Navbar
        goHome={goHome}
      />


      <main>


        {page === "home" && (

          <>

            <Hero

              searchInput={
                searchInput
              }

              setSearchInput={
                setSearchInput
              }

              handleSearch={
                handleSearch
              }

            />


            <MovieList

              movies={
                movies
              }

              loading={
                loading
              }

              error={
                error
              }

              searchTerm={
                searchTerm
              }

              sortOrder={
                sortOrder
              }

              setSortOrder={
                setSortOrder
              }

              openMovie={
                openMovie
              }

            />

          </>

        )}



        {page === "details" && (

          <MovieDetails

            movie={
              selectedMovie
            }

            loading={
              loading
            }

            error={
              error
            }

            goHome={
              goHome
            }

          />

        )}


      </main>


      <Footer />


    </div>

  );

}

export default App;