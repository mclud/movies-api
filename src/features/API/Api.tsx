import axios from "axios";
const API_KEY: string = "ba7127ff595ba064632ad793ffb91fa9"; 

//get ALL MOVIES
export const getMovies = async () => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
  );
};

//get MOVIE BY ID
export const getMovieById = async (id: number) => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
};
//fetching NEXT PAGE OF RESULTS
export const addNextPage = async (page: number) => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );
};

//GET TYPES OF MOVIES AVAILABLE
export const getTypes = async () => {
  return await axios.get(
    `https://api.themoviedb.org/3//genre/movie/list?api_key=${API_KEY}`
  );
};

//GET CONFIG (Base url for posters, backdrops)
export const getConfig = async () => {
  return await axios.get(
    `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
  );
};

//try to get movie from search
export const getMoviesBySearch = async (search: string, page = 1) => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURI(
      search
    )}&page=${page}`
  );
};

//try to get movie from search
export const addNextSearch = async (search: string, page: number) => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURI(
      search
    )}&page=${page}`
  );
};

/**
 * [extract the query, make the API call via redux and set the state of current search]
 * @return List of genres
 */
export const getCategories = async () => {
  return await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
};
