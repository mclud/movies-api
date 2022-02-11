import { CardInterface } from "../../components/MovieCard/MovieCard";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface FavsInterface {
  movies: Array<CardInterface>;
  total_favs: number;
}

const initialState: FavsInterface = {
  movies: [],
  total_favs: 0,
};

export const favsSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    addFav: (state, action) => {
      if (
        state.movies.filter((movie) => movie.id === action.payload.id)
          .length === 0
      ) {
        state.movies = [...state.movies, action.payload];
        state.total_favs = state.movies.length;
        localStorage.setItem("fav-movies", JSON.stringify(state.movies));
      }
    },
    removeFav: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      state.total_favs = state.movies.length;
      localStorage.setItem("fav-movies", JSON.stringify(state.movies));
    },
    importStorage: (state) => {
      let movies = localStorage.getItem("fav-movies");
      if (movies) {
        state.movies = JSON.parse(movies);
        state.total_favs = state.movies.length;
      } else {
        console.log(movies, "there is no fav stored");
      }
    },
  },
});

//create slice

//export actions
export const { addFav, removeFav, importStorage } = favsSlice.actions;

//selector
export const selectFavs = (state: RootState) => state.favs;

export default favsSlice.reducer;
