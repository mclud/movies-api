import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovieById } from "../../features/API/Api";
import { selectApi } from "../../features/API/apiSlice";
import { setLine, setBackDrop, resetHeader } from "../Header/headerSlice";
import "./Movie.css";
import { displayDateSortie } from "../MovieCard/MovieCard";

export interface MovieState {
  id: number;
  title: string;
  backdrop_path: string;
  budget: number;
  overview: string;
  tagline: string;
  poster_path: string;
  release_date: string;
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
};

function Movie() {
  const dispatch = useDispatch();
  const configSelector = useSelector(selectApi);
  let cfg = configSelector.config;
  let baseUrl =
    configSelector.config.base_url !== ""
      ? configSelector.config.base_url +
        cfg.backdrop_sizes[cfg.backdrop_sizes.length - 2]
      : null;

  let params = useParams();

  let [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  let [movie, setMovie] = useState<MovieState>(movieInitialState);

  function fetchMovie() {
    setLoadingMovie(true);

    if (params.id) {
      getMovieById(parseInt(params.id))
        //request ok
        .then((resp) => {
          //Setting movie state
          setMovie({ ...resp.data });
          dispatch(setLine(resp.data.tagline));

          //dispatch backdrop only if it exists
          if (resp.data.backdrop_path)
            dispatch(setBackDrop(baseUrl + resp.data.backdrop_path));

          setLoadingMovie(false);
        })
        //handle error
        .catch((err) => console.log(err));
    }
  }

  //Reset header background when leaving a movie details page
  useEffect(() => {
    return () => {
      dispatch(resetHeader());
    };
  }, []);

  //Fetch movie when we have fetch the cfg from api
  useEffect(fetchMovie, [configSelector]);

  return (
    <div className="movie-dp">
      {loadingMovie && <div>LOADING....</div>}
      {movie && (
        <div>
          <Row className="movie-row">
            <Col md={5}>
              <img src={baseUrl + movie.poster_path} className="movie-poster" />
            </Col>
            <Col md={7}>
              <div className="details">
                <h3>{movie.title}</h3>
                <br />
                <div>
                  Release date : {displayDateSortie(movie.release_date)}
                </div>
                <br />
                <div>{movie.overview}</div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Movie;
