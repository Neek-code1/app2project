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
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);