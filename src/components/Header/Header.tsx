import logo from "../../images/film.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { Col, Container, Row } from "react-bootstrap";
import { Flags } from "../Flags/Flags";

function Header() {
  return (
    <Container fluid className="header d-flex flex-column">
      <nav>
        <ul className="d-flex justify-space-between align-items-center row">
          <Col md={3} xs={12}>
            <li className="brand d-flex align-items-center justify-space-center">
              <img className="logo" src={logo} />
              <div className="logo-title">WATCHOUT</div>
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
    </Container>
  );
}

export default Header;
