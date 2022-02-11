// @flow

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard/MovieCard";
import { importStorage, selectFavs } from "./favsSlice";
import "./Favs.css";

export default function Favs() {
  const storedFavs = useSelector(selectFavs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importStorage());
  }, [storedFavs.total_favs]);

  return (
    <ul className="movies-favs">
      {storedFavs.movies.map((fav) => (
        <MovieCard key={fav.id} {...fav} />
      ))}
    </ul>
  );
}
