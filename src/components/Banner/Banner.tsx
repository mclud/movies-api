// @flow
import "./Banner.css";
import { useSelector } from "react-redux";
import homePoster from "../../images/home.png";
import { selectHeader } from "../Header/headerSlice";
import Searchbar from "../Searchbar/Searchbar";

interface BannerInterface {
  active_search: boolean;
}

export const Banner = (props: BannerInterface) => {
  const headerState = useSelector(selectHeader);
  return (
    <div className="header-bg">
      {headerState.backdrop ? (
        <img src={headerState.backdrop} />
      ) : (
        <img src={homePoster} />
      )}
      <div className="header-content">
        <h3 className="tagline">{headerState.tagline}</h3>
        {props.active_search && <Searchbar />}
      </div>
    </div>
  );
};
