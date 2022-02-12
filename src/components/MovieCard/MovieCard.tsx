import { useDispatch, useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { selectApi } from "../../features/API/apiSlice";
import favImg from "../../images/fav_off.png";
import { addFav, removeFav, selectFavs } from "../../features/favs/favsSlice";
import "./MovieCard.css";
import { useState } from "react";
import { useEffect } from "react";
import { Heart } from "../Heart/Heart";

//typing card props
export interface CardInterface {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

//function that changes the month(int) into his name(string)
export const displayDateSortie = (date: string) => {
  const monthNamesFr = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const monthNamesEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //rgx and pull out the day, year, and month after passing it to local date (fr format)
  let month = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/gi.exec(
    new Date(date).toLocaleDateString() //french date version
  );
  if (month) {
    //we pull the name of the month from the library && the day+year from the movie release's date
    let monthFixed = parseInt(month[2]) - 1;
    let day = month[1];
    let year = month[3];
    //we return the jsx
    return (
      // day + " " + monthNamesEn[monthFixed] + " " + year
      <div>{year}</div>
    );
  } else return "Release date unknown";
};

function MovieCard(props: CardInterface) {
  const dispatch = useDispatch();
  const favs = useSelector(selectFavs);
  let [movieFav, setMovieFav] = useState(false);
  /*
  BUILDING THE PATH FOR IMG's SRC
  */
  //we select the api storage
  let apiCfg = useSelector(selectApi);
  //extract the base url
  let baseUrl = apiCfg.config.base_url;
  //we set the size of the poster's img (List page), if it doesnt exist we set the minimum size (first index of size's array)
  let size =
    apiCfg.config.poster_sizes.filter((e) => e === "w185").length > 0
      ? "w185"
      : apiCfg.config.poster_sizes[1];
  //we build the first part of our img's src
  let cleanUrl = baseUrl + size;

  //PULLING DATA FROM PROPS
  let { id, title, poster_path, release_date } = { ...props };

  //checking if moving is in favorites
  useEffect(() => {
    let movieFromFav = favs.movies.filter((movie) => movie.id === id);
    if (movieFromFav.length > 0 && !movieFav) {
      setMovieFav(true);
    } else if (movieFav && movieFromFav.length === 0) {
      setMovieFav(false);
    }
  }, [favs]);

  return (
    <li className="movie-card" key={id} data-title={title}>
      <div className="movie-container">
        <Link to={"/movie/" + id}>
          <img src={cleanUrl + poster_path} className="front-card" />
        </Link>
        <div className="movie-container-details">
          <div className="movie-card-title">{title}</div>
          <div className="movie-card-date">
            {displayDateSortie(release_date)}
          </div>
          <Heart fav={movieFav} {...props} />
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
