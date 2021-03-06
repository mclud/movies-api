import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getMovies,
  addNextPage,
  getConfig,
  getMoviesBySearch,
  addNextSearch,
  getCategories,
  getMoviesByCategories,
} from "./Api";
import {
  MoviesResults,
  moviesResultsInitialState,
} from "../../components/MoviesList/MoviesList";
import { Categorie } from "../../pages/Categories/Categories";

export interface SearchByCategories {
  lang: string;
  genre: string;
}

export interface ConfigState {
  base_url: string;
  poster_sizes: Array<string>;
  backdrop_sizes: Array<string>;
}

export interface ApiState {
  movies: MoviesResults;
  search: MoviesResults;
  config: ConfigState;
  status: string;
  actual_search: string;
  cats: Categorie[];
}

export interface LazySearchInterface {
  search: string;
  page: number;
}

const initialState: ApiState = {
  movies: moviesResultsInitialState,
  search: moviesResultsInitialState,
  config: { base_url: "", poster_sizes: [], backdrop_sizes: [] },
  status: "waiting",
  actual_search: "",
  cats: [],
};

export const getMoviesAsync = createAsyncThunk(
  "api/getMovies",
  async (lang: string) => {
    const response = await getMovies(lang);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getConfigAsync = createAsyncThunk("api/getConfig", async () => {
  const response = await getConfig();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const getCategoriesAsync = createAsyncThunk("api/cats", async () => {
  const response = await getCategories();
  return response.data;
});

export const getMoviesBySearchAsync = createAsyncThunk(
  "api/search",
  async (search: string) => {
    const response = await getMoviesBySearch(search);
    return response.data;
  }
);

export const lazyMovies = createAsyncThunk(
  "api/lazyMovies",
  async (page: number) => {
    const response = await addNextPage(page + 1);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const lazySearch = createAsyncThunk(
  "api/lazySearch",
  async (data: { search: string; page: number }) => {
    const { search, page } = data;
    const response = await addNextSearch(search, page + 1);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getMoviesByCatAsync = createAsyncThunk(
  "api/getMoviesByCat",
  async (obj: SearchByCategories) => {
    const response = await getMoviesByCategories(obj);
    // The value we return becomes the `fulfilled` action payload
    return { res: response.data, id: obj.genre };
  }
);

const addMovies = (existingMovies: any[], moviesToAdd: any[]) => {
  //avoid clone
  let toAdd = moviesToAdd.filter((movieToAdd: { id: number }) => {
    if (
      existingMovies.filter(
        (existingMovie: { id: number }) => existingMovie.id === movieToAdd.id
      ).length === 0
    )
      return movieToAdd;
    else return null;
  });
  return existingMovies.concat(toAdd);
};

export const ApiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = "ok";
    },
    setActualSearch: (state, action) => {
      state.actual_search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get Movies
      .addCase(getMoviesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMoviesAsync.fulfilled, (state, action) => {
        //avoid clone
        let moviesToAdd = addMovies(
          state.movies.results,
          action.payload.results
        );
        state.movies.page = action.payload.page;
        state.movies.results = moviesToAdd;
        state.movies.total_pages = action.payload.total_pages;
        state.movies.total_results = action.payload.total_results;
        state.status = "filled";
      })

      .addCase(getMoviesBySearchAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMoviesBySearchAsync.fulfilled, (state, action) => {
        state.search = action.payload;
        state.status = "filled";
      })

      //Add Movies
      .addCase(lazyMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(lazyMovies.fulfilled, (state, action) => {
        state.movies.results = addMovies(
          state.movies.results,
          action.payload.results
        );
        state.status = "filled";
        state.movies.page = action.payload.page;
      })

      //Add Movies To Research
      .addCase(lazySearch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(lazySearch.fulfilled, (state, action) => {
        state.search.results = addMovies(
          state.search.results,
          action.payload.results
        );
        state.status = "filled";
        state.search.page = action.payload.page;
      })

      //Get Config
      .addCase(getConfigAsync.fulfilled, (state, action) => {
        state.config = action.payload.images;
      })

      //Get categories
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.cats = action.payload.genres;
      })

      //Get movies by cats
      .addCase(getMoviesByCatAsync.fulfilled, (state, action) => {
        //now focus the categorie we need to fill with suggestions
        let catId = parseInt(action.payload.id);
        state.cats.forEach((cat) => {
          if (cat.id === catId) {
            cat.suggestions = action.payload.res;
          }
        });
      });
  },
});

//export actions
export const { setStatus, setActualSearch } = ApiSlice.actions;

//selector
export const selectApi = (state: RootState) => state.api;

export default ApiSlice.reducer;
