import logo from "../../images/film.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { Col, Container } from "react-bootstrap";
import { Flags } from "../Flags/Flags";
import { HeaderTrads } from "./HeaderTrad";
import { selectNavCfg } from "../../features/navCfg/navCfgSlice";
import { useSelector } from "react-redux";

function Header() {
  let navCfg = useSelector(selectNavCfg);

  return (
    <Container fluid className="header d-flex flex-column p-2">
      <div className="d-flex justify-space-between align-items-center row">
        <Col md={3} xs={12}>
          <div className="brand d-flex align-items-center justify-space-center">
            <img className="logo" src={logo} alt="logoo" />
            <div className="logo-title">WATCHOUT</div>
          </div>
        </Col>
        <Col md={7} xs={12}>
          <nav className="row">
            <Col md={7}>
              <ul>
                <li>
                  <Col>
                    <Link to="/">{{ ...HeaderTrads(navCfg.lang) }.home}</Link>
                  </Col>
                </li>
                <li>
                  <Link to="/favs">{{ ...HeaderTrads(navCfg.lang) }.favs}</Link>
                </li>
                <li>
                  <Link to="/cats">{{ ...HeaderTrads(navCfg.lang) }.cats}</Link>
                </li>
              </ul>
            </Col>
            <Col md={3} xs={12}>
              <Searchbar />
            </Col>
          </nav>
        </Col>
        <Col md={2} xs={12}>
          <Flags />
        </Col>
      </div>
    </Container>
  );
}

export default Header;
