// @flow
import flagFr from "../../images/fr.png";
import flagEn from "../../images/en.png";
import "./Flags.css";
import { useRef } from "react";

export const Flags = () => {
  const english = useRef<HTMLImageElement>(null);
  const french = useRef<HTMLImageElement>(null);

  const handleLang = (target: string | null) => {
    console.log("lang:", target);
  };
  return (
    <div className="langs row d-flex">
      <img
        alt="french flag"
        ref={french}
        src={flagFr}
        className="flag"
        data-lang="fr"
        onClick={(e) => handleLang(e.currentTarget.getAttribute("data-lang"))}
      />
      <img
        alt="uk flag"
        ref={english}
        src={flagEn}
        className="flag"
        data-lang="en"
        onClick={(e) => handleLang(e.currentTarget.getAttribute("data-lang"))}
      />
    </div>
  );
};
