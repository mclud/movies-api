import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MovieSlider } from "../../components/MovieSlider/MovieSlider";
import { MoviesResults } from "../../components/MoviesList/MoviesList";
import { selectApi } from "../../features/API/apiSlice";
import "./Categories.css";

export interface Categorie {
  id: number;
  name: string;
  suggestions: MoviesResults;
}

export default function Categories() {
  let api = useSelector(selectApi);

  return (
    <ul className="categories row">
      {api.cats &&
        api.cats.map((cat) => {
          return (
            <Col md={12} key={cat.id}>
              <div className="categorie">
                <h2 className="categorie-name">{cat.name}</h2>
                <MovieSlider {...cat} slidesToShow={5} />
              </div>
            </Col>
          );
        })}
    </ul>
  );
}
