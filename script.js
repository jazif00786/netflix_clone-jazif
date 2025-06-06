const API_KEY = "d89745d1c4948189b8a1c0fb16716f2c"; // Replace this with your own TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const requests = {
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

async function fetchMovies(url, containerId) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.results.forEach((movie) => {
      const img = document.createElement("img");
      img.src = `${IMG_PATH}${movie.poster_path}`;
      img.alt = movie.title || movie.name || "Movie Poster";
      container.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Fetch and render all categories
fetchMovies(requests.popular, "popular");
fetchMovies(requests.topRated, "topRated");
fetchMovies(requests.trending, "trending");
