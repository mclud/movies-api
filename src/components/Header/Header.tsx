import logo from "../../images/film.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Searchbar from "../../features/searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { selectHeader } from "./headerSlice";
import homePoster from "../../images/home.jpg";
import { Flags } from "../Flags/Flags";

function Header() {
  let dispatch = useDispatch();
  let headerState = useSelector(selectHeader);

  return (
    <Container fluid className="header d-flex flex-column">
      <nav>
        <ul className="d-flex justify-space-between align-items-center row">
          <Col md={3} xs={12}>
            <li className="brand d-flex align-items-center justify-space-center">
              <img className="logo" src={logo} />
              <div>WatchOut</div>
            </li>
          </Col>
          <Col md={7} xs={12} className="categorys">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favs">Favorites</Link>
            </li>
            <li>
              <Link to="/cats">Categorys</Link>
            </li>
            <Searchbar />
          </Col>
          <Col md={2} xs={12}>
            <Flags />
          </Col>
        </ul>
      </nav>
      <div className="header-bg">
        {headerState.backdrop ? (
          <img src={headerState.backdrop} />
        ) : (
          <img src={homePoster} />
        )}

        <h3 className="tagline">{headerState.tagline}</h3>
      </div>
    </Container>
  );
}

export default Header;
