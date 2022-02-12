import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MoviesList.css";
import { MovieState } from "../Movie/Movie";
import MovieCard, { CardInterface } from "../MovieCard/MovieCard";
import { selectApi } from "../../features/API/apiSlice";

export interface MoviesResults {
  page: number;
  results: MovieState[];
  total_pages: number;
  total_results: number;
}

export interface MoviesResultsProps {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
  lazy: Function;
  type: string;
}

export const moviesResultsInitialState = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

function MoviesTest(props: MoviesResultsProps) {
  const dispatch = useDispatch();
  const api = useSelector(selectApi);

  useEffect(() => {
    //let the loader be, and then observe.
    setTimeout(() => {
      const target = document.querySelector(".loader");
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio === 1 &&
            props.results &&
            props.page !== props.total_pages
          ) {
            //dispatch lazy regarding the type of page we are on
            if (props.type === "search") {
              dispatch(
                props.lazy({ search: api.actual_search, page: props.page })
              );
            } else {
              dispatch(props.lazy(props.page));
            }
            observer.disconnect();
          }
        });
      });
      if (target) observer.observe(target);
    }, 1500);
  }, [props.results]);

  return (
    <ul className="movies-list">
      {props.results
        .filter((movie) => movie.poster_path !== null)
        .map((movie: CardInterface) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      <div className="loader" />
    </ul>
  );
}

export default MoviesTest;
