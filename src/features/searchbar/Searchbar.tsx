import { useState } from "react";
import "./Searchbar.css";
import searchico from "../../images/search.png";
import { useNavigate } from "react-router";

function Searchbar() {
  let [inputVal, setInputVal] = useState("");
  let nav = useNavigate();

  const handleSearch = () => {
    if (inputVal.length) nav(`/search?q=${inputVal}`);
  };
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter your search"
          onChange={(e) => setInputVal(e.target.value.toString())}
        />
        <img
          className="search-ico"
          src={searchico}
          onClick={() => handleSearch()}
        />
      </div>
    </div>
  );
}

export default Searchbar;
