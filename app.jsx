function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          Cine<span>Find</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#movies">Browse</a>
        </div>
      </nav>
      <main>
  <section className="hero">
    <div className="hero-content">
      <p className="small-title">
        DISCOVER YOUR NEXT FAVORITE
      </p>

      <h1>Search Movies & TV Shows</h1>

      <p className="hero-text">
        Find movies, series, and episodes instantly using the OMDb movie database.
      </p>

      <form id="searchForm" className="search-form">
        <input
          type="text"
          id="searchInput"
          placeholder="Search Batman, Avengers, Barbie..."
        />

        <button type="submit">
          Search
        </button>
      </form>
    </div>
  </section>
</main>
    </>
  );
  <div className="filter-container">
  <label htmlFor="filter">
    Filter:
  </label>

  <select id="filter">
    <option value="">All</option>
    <option value="movie">Movies</option>
    <option value="series">Series</option>
    <option value="episode">Episodes</option>
  </select>
</div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);