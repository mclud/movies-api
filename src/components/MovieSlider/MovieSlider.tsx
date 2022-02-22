import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import { MovieState } from "../Movie/Movie";
import { MoviesResults } from "../MoviesList/MoviesList";

type Props = {
  slidesToShow: number;
  name: string;
  id: number;
  suggestions: MoviesResults;
};
export const MovieSlider = (props: Props) => {
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {props.suggestions.results.map((movie: MovieState) => {
        return <MovieCard key={props.id} {...movie} />;
      })}
    </Slider>
  );
};
