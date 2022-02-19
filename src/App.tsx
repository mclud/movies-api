import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigAsync,
  getMoviesAsync,
  selectApi,
} from "./features/API/apiSlice";
import { useEffect } from "react";
import { Routes, useNavigationType } from "react-router";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./pages/SearchPage/SearchPage";
import { importStorage } from "./features/favs/favsSlice";
import Favs from "./features/favs/Favs";
import Categories from "./pages/Categories/Categories";
import { Home } from "./pages/Home/Home";
import MoviePage from "./pages/MoviePage/MoviePage";
import { selectNavCfg } from "./features/navCfg/navCfgSlice";

function App() {
  let dispatch = useDispatch();
  let navCfg = useSelector(selectNavCfg);

  //FETCH MOVIES & cfg - Exec 1 time at landing
  useEffect(() => {
    dispatch(getConfigAsync());
    dispatch(getMoviesAsync());
    dispatch(importStorage());
  }, []);

  useEffect(() => {
    console.log(navCfg);
  });

  return (
    <Router>
      <div id="app" lang={navCfg.lang}>
        <Row className="main-row">
          <Col
            md={{ span: 10, offset: 1 }}
            sm={{ span: 12, offset: 0 }}
            className="main-col-content"
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movie/:id" element={<MoviePage />}></Route>
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
