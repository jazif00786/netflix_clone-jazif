<script>
  const API_KEY = "d89745d1c4948189b8a1c0fb16716f2c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // safer size than original

  const trendingRow = document.getElementById("trending-row");
  const topratedRow = document.getElementById("toprated-row");

  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";

    if (!movie.poster_path) {
      console.warn("Missing poster_path for movie:", movie.title || movie.name);
      return null;
    }

    const img = document.createElement("img");
    img.src = IMAGE_BASE_URL + movie.poster_path;
    img.alt = movie.title || movie.name;

    const info = document.createElement("div");
    info.className = "movie-info";
    info.textContent = movie.title || movie.name;

    const actions = document.createElement("div");
    actions.className = "movie-actions";

    const playBtn = document.createElement("button");
    playBtn.className = "action-btn";
    playBtn.title = "Play";
    playBtn.innerHTML = "▶";

    const plusBtn = document.createElement("button");
    plusBtn.className = "action-btn";
    plusBtn.title = "Add to List";
    plusBtn.innerHTML = "+";

    actions.appendChild(playBtn);
    actions.appendChild(plusBtn);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(actions);

    return card;
  }

  async function fetchMovies(url, container) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      container.innerHTML = "";
      data.results.forEach((movie) => {
        const card = createMovieCard(movie);
        if (card) container.appendChild(card);
      });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      container.innerHTML = `<p style="color:#e50914; font-weight:bold;">Failed to load movies. Please try again later.</p>`;
    }
  }

  fetchMovies(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`, trendingRow);
  fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, topratedRow);

  // Profile screen toggle
  const profileIcon = document.getElementById("profile-icon");
  const profileScreen = document.getElementById("profile-screen");
  const closeProfileBtn = document.getElementById("close-profile");
  const mainContent = document.getElementById("main-content");

  profileIcon.addEventListener("click", () => {
    profileScreen.style.display = "block";
    mainContent.style.display = "none";
  });

  closeProfileBtn.addEventListener("click", () => {
    profileScreen.style.display = "none";
    mainContent.style.display = "block";
  });
</script>
