import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovieById, getMovieDetailsById } from "../../features/API/Api";
import { selectApi } from "../../features/API/apiSlice";
import { setLine, setBackDrop, resetHeader } from "../Header/headerSlice";
import "./Movie.css";
import { Heart } from "../Heart/Heart";
import { Banner } from "../Banner/Banner";
import { Stars } from "../Stars/Stars";
import { selectNavCfg } from "../../features/navCfg/navCfgSlice";

export interface Genre {
  id: number;
  name: string;
}
export interface MovieState {
  id: number;
  title: string;
  backdrop_path: string;
  budget: number;
  overview: string;
  tagline: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
}

export const movieInitialState = {
  id: 0,
  title: "",
  backdrop_path: "",
  budget: 0,
  overview: "",
  tagline: "",
  poster_path: "",
  release_date: "",
  runtime: 0,
  vote_average: 0,
  genres: [{ id: 0, name: "" }],
};

function Movie() {
  const dispatch = useDispatch();
  const api = useSelector(selectApi);
  let cfg = api.config;
  let baseUrl =
    api.config.base_url !== ""
      ? api.config.base_url + cfg.backdrop_sizes[cfg.backdrop_sizes.length - 2]
      : null;
  let cats = useSelector(selectApi).cats;
  const navCfg = useSelector(selectNavCfg);
  let params = useParams();

  let [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  let [movie, setMovie] = useState<MovieState>(movieInitialState);
  let [movieCredits, setMovieCredits] = useState({ value: [] });

  function fetchMovie() {
    setLoadingMovie(true);

    if (params.id) {
      getMovieById(parseInt(params.id), navCfg.lang)
        //request ok
        .then((resp) => {
          //Setting movie state
          setMovie({ ...resp.data });
          dispatch(setLine(resp.data.tagline));

          getMovieDetailsById(resp.data.id).then((data) =>
            setMovieCredits(data.data)
          );

          //dispatch backdrop only if it exists
          if (resp.data.backdrop_path)
            dispatch(setBackDrop(baseUrl + resp.data.backdrop_path));

          setLoadingMovie(false);
          console.log("CREDITS:", movieCredits);
        })
        //handle error
        .catch((err) => console.log(err));
    }
  }

  //return proper time format FOR Duration
  const displayDuration = (duration: number) => {
    let h = (duration / 60).toFixed(0);
    let m = duration % 60;
    return h + ":" + m;
  };

  //return JSX FOR CATEGORIES
  const displayCategories = () => {
    let activeCats = cats.filter((e) => {
      return (
        movie.genres.filter((cat) => {
          return cat.id === e.id;
        }).length > 0
      );
    });
    return (
      <div className="movie-dval">
        {activeCats.map((cat) => (
          <div key={cat.id} className="movie-categorie-name">
            {cat.name}
          </div>
        ))}
      </div>
    );
  };

  //Reset header background when leaving a movie details page
  useEffect(() => {
    return () => {
      dispatch(resetHeader());
    };
  }, [api, dispatch]);

  //Fetch movie at landing & when lang is changing
  useEffect(fetchMovie, [navCfg.lang, dispatch]);

  return (
    <div className="movie-dp">
      <Banner active_search={false} />
      {loadingMovie && <div>LOADING....</div>}
      {movie && (
        <div>
          <Row className="movie-row m-0">
            <Col md={3} className="movie-leftside">
              <div className="movie-poster">
                <img alt="poster" src={baseUrl + movie.poster_path} />
                <div className="movie-left-bottom">
                  <Stars {...movie} />
                  <Heart {...movie} />
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className="details">
                <h3>{movie.title}</h3>
                <br />

                <div>{movie.overview}</div>
                <div className="movie-details">
                  <div className="movie-d movie-duration">
                    <div className="movie-dname">Duration</div>
                    <div className="movie-dval">
                      {displayDuration(movie.runtime)}
                    </div>
                  </div>
                  <div className="movie-d movie-genre">
                    <div className="movie-dname">Genre</div>
                    {displayCategories()}
                  </div>
                  <div className="movie-d movie-release">
                    <div className="movie-dname">Release date</div>
                    <div className="movie-dval">{movie.release_date}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Movie;
