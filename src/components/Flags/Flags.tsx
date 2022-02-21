// @flow
import flagFr from "../../images/fr.png";
import flagEn from "../../images/en.png";
import "./Flags.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNavCfg, setLang } from "../../features/navCfg/navCfgSlice";
import { getMoviesAsync } from "../../features/API/apiSlice";

export const Flags = () => {
  const english = useRef<HTMLImageElement>(null);
  const french = useRef<HTMLImageElement>(null);
  const dispatch = useDispatch();
  const navCfg = useSelector(selectNavCfg);

  const handleLang = (lang: string | null) => {
    dispatch(setLang(lang));
  };
  return (
    <div className="langs row d-flex">
      <img
        alt="french flag"
        ref={french}
        src={flagFr}
        className="flag"
        data-lang="fr-FR"
        onClick={(e) => handleLang(e.currentTarget.getAttribute("data-lang"))}
      />
      <img
        alt="uk flag"
        ref={english}
        src={flagEn}
        className="flag"
        data-lang="en-US"
        onClick={(e) => handleLang(e.currentTarget.getAttribute("data-lang"))}
      />
    </div>
  );
};
