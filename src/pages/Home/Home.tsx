import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Banner } from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import MoviesList from "../../components/MoviesList/MoviesList";
import { lazyMovies, selectApi } from "../../features/API/apiSlice";
import "./Home.css";

export const Home = () => {
  let api = useSelector(selectApi);
  let path = useLocation();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div>

      <Banner active_search={true} />
      <section className="home">
        <MoviesList {...api.movies} lazy={lazyMovies} type="movies" />
      </section>
    </div>
  );
};
