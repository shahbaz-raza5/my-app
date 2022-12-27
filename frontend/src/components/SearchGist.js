import React, { useState } from "react";
import myStyle from "../styles/Search.module.css";
import { showSearchData } from "Redux/SearchData/SearchAction";
import { useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
const SearchGist = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState([]);
  const [searchId, setSearchId] = useState([]);
  const gistSearch = async (e) => {
    setSearchId(e.target.value);
    let data = await fetch(`https://api.github.com/gists/${searchId}`);
    data = await data.json();
    setSearch(data);
  };
  return (
    <div>
      <input type="text" className={myStyle["search"]} onChange={gistSearch} />
      <button
        className={myStyle["searchBtn"]}
        onClick={() => dispatch(showSearchData(search))}
      >
        <BiSearch color="white" />
      </button>
    </div>
  );
};

export default SearchGist;
