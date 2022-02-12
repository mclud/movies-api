import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigAsync,
  getMoviesAsync,
  lazyMovies,
  selectApi,
} from "./features/API/apiSlice";
import { useEffect } from "react";
import Movie from "./components/Movie/Movie";
import { Routes } from "react-router";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage, { SearchTest } from "./pages/SearchPage/SearchPage";
import { importStorage } from "./features/favs/favsSlice";
import MoviesListt from "./components/MoviesList/MoviesList";
import Favs from "./features/favs/Favs";
import Categories from "./pages/Categories/Categories";
import MoviesList from "./components/MoviesList/MoviesList";

function App() {
  let dispatch = useDispatch();
  let api = useSelector(selectApi);

  //FETCH MOVIES & cfg - Exec 1 time at landing
  useEffect(() => {
    dispatch(getConfigAsync());
    dispatch(getMoviesAsync());
    dispatch(importStorage());
  }, []);

  return (
    <Router>
      <div id="app">
        <Row className="main-row">
          <Col md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <MoviesList {...api.movies} lazy={lazyMovies} type="movies" />
                }
              ></Route>
              <Route path="/movie/:id" element={<Movie />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/favs" element={<Favs />}></Route>
              <Route path="/cats" element={<Categories />}></Route>
            </Routes>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
