import { KeyboardEvent, useState } from "react";
import "./Searchbar.css";
import searchico from "../../images/search.png";
import { useNavigate } from "react-router";

function Searchbar() {
  let [inputVal, setInputVal] = useState("");
  let nav = useNavigate();

  const handleSearch = () => {
    console.log("handle search");
    if (inputVal.length) nav(`/search?q=${inputVal}`);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter your search"
          onChange={(e) => setInputVal(e.target.value.toString())}
          onKeyUp={(e) => handleKeyPress(e)}
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
