import logo from "../../images/film.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { Col, Container, Row } from "react-bootstrap";
import { Flags } from "../Flags/Flags";
import { HeaderTrads } from "./HeaderTrad";
import { selectNavCfg } from "../../features/navCfg/navCfgSlice";
import { useSelector } from "react-redux";

function Header() {
  let navCfg = useSelector(selectNavCfg);

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
              <Link to="/">{{ ...HeaderTrads(navCfg.lang) }.home}</Link>
            </li>
            <li>
              <Link to="/favs">{{ ...HeaderTrads(navCfg.lang) }.favs}</Link>
            </li>
            <li>
              <Link to="/cats">{{ ...HeaderTrads(navCfg.lang) }.cats}</Link>
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
