import Slider from "react-slick";

// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesByCategories } from "../../features/API/Api";
import { selectNavCfg } from "../../features/navCfg/navCfgSlice";
import MovieCard, { CardInterface } from "../MovieCard/MovieCard";
type Props = {
  slidesToShow: number;
  name: string;
  id: number;
};
export const MovieSlider = (props: Props) => {
  const dispatch = useDispatch();
  const navCfg = useSelector(selectNavCfg);
  const [sliderMovies, setSliderMovies] = useState({ results: [] });
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    dots: false,
    speed: 300,
    slidesToShow: props.slidesToShow,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    console.log("hello", props.id.toString());
    if (sliderMovies.results.length === 0) {
      getMoviesByCategories({
        lang: navCfg.lang,
        genre: props.id.toString(),
      })
        .then((res) => {
          console.log("response: ", res.data.results);
          setSliderMovies({ results: res.data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(sliderMovies);
  }, []);

  return (
    <Slider {...settings}>
      {sliderMovies.results.map((movie) => {
        return <MovieCard key={props.id} {...movie} />;
      })}
    </Slider>
  );
};
