// @flow

import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MovieSlider } from "../../components/MovieSlider/MovieSlider";
import { getCategoriesAsync, selectApi } from "../../features/API/apiSlice";
import "./Categories.css";

export interface Categories {
  genres: Categorie[];
}

export interface Categorie {
  id: number;
  name: string;
}

export default function Categories() {
  let api = useSelector(selectApi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  return (
    <ul className="categories row">
      {api.cats &&
        api.cats.map((cat) => {
          return (
            <Col md={12} key={cat.id}>
              <div className="categorie">
                <div className="categorie-name">{cat.name}</div>
                <MovieSlider {...cat} slidesToShow={2} />
              </div>
            </Col>
          );
        })}
    </ul>
  );
}
