import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovieById, getMovieDetailsById } from "../../features/API/Api";
import { selectApi } from "../../features/API/apiSlice";
import { setLine, setBackDrop, resetHeader } from "../Header/headerSlice";
import "./Movie.css";
import { displayDateSortie } from "../MovieCard/MovieCard";
import { Heart } from "../Heart/Heart";

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
  let [movieCredits, setMovieCredits] = useState(null);

  function fetchMovie() {
    setLoadingMovie(true);

    if (params.id) {
      getMovieById(parseInt(params.id))
        //request ok
        .then((resp) => {
          //Setting movie state
          setMovie({ ...resp.data });
          console.log(resp.data);
          dispatch(setLine(resp.data.tagline));
          let credits = getMovieDetailsById(resp.data.id).then((data) =>
            console.log("!!", data.data)
          );

          //dispatch backdrop only if it exists
          if (resp.data.backdrop_path)
            dispatch(setBackDrop(baseUrl + resp.data.backdrop_path));

          setLoadingMovie(false);
          console.log("CREDITS:", credits);
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
          <Row className="movie-row m-0">
            <Col md={3} className="movie-leftside">
              <div className="movie-poster">
                <img src={baseUrl + movie.poster_path} />
                <div className="movie-left-bottom">
                  <Heart {...movie} />
                </div>
              </div>
            </Col>
            <Col md={9}>
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
