import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAsync,
  getConfigAsync,
  getMoviesAsync,
  getMoviesByCatAsync,
  selectApi,
} from "./features/API/apiSlice";
import { useEffect } from "react";
import { Routes } from "react-router";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./pages/SearchPage/SearchPage";
import { importStorage } from "./features/favs/favsSlice";
import Favs from "./features/favs/Favs";
import Categories from "./pages/Categories/Categories";
import { Home } from "./pages/Home/Home";
import { selectNavCfg } from "./features/navCfg/navCfgSlice";
import Movie from "./components/Movie/Movie";
import TestJest from "./components/TestJest/TestJest";

function App() {
  let dispatch = useDispatch();
  let navCfg = useSelector(selectNavCfg);
  let api = useSelector(selectApi);

  //FETCH MOVIES & cfg - Exec 1 time at landing
  useEffect(() => {
    dispatch(getConfigAsync());
    dispatch(getMoviesAsync(navCfg.lang));
    dispatch(importStorage());
    dispatch(getCategoriesAsync());
  }, [navCfg, dispatch]);

  const fetchSuggestionsOfCat = () => {
    if (
      api.cats.length > 0 &&
      api.cats.filter((e) => e.suggestions !== undefined).length === 0
    ) {
      api.cats.forEach((cat) => {
        dispatch(
          getMoviesByCatAsync({ lang: navCfg.lang, genre: cat.id.toString() })
        );
      });
    }
  };

  //fill categories with suggestions
  useEffect(fetchSuggestionsOfCat, [navCfg.lang, dispatch, api.cats]);

  return (
    <Router>
      <div id="app" lang={navCfg.lang}>
        <Header />
        <Row className="main-row">
          <Col
            md={{ span: 10, offset: 1 }}
            sm={{ span: 12, offset: 0 }}
            className="main-col-content"
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movie/:id" element={<Movie />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/favs" element={<Favs />}></Route>
              <Route path="/cats" element={<Categories />}></Route>
              <Route
                path="/test"
                element={
                  <TestJest
                    shouldRemember={false}
                    onUsernameChange={function (username: string): void {
                      throw new Error("Function not implemented.");
                    }}
                    onPasswordChange={function (password: string): void {
                      throw new Error("Function not implemented.");
                    }}
                    onRememberChange={function (remember: boolean): void {
                      throw new Error("Function not implemented.");
                    }}
                    onSubmit={function (
                      username: string,
                      password: string
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                }
              ></Route>
            </Routes>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
