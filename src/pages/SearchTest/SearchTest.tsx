// @flow
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MoviesListt from "../../components/MoviesListt/MoviesListt";
import {
  getMoviesBySearchAsync,
  lazySearch,
  selectApi,
  setActualSearch,
} from "../../features/API/apiSlice";

export const SearchTest = () => {
  let [urlParams] = useSearchParams();
  const dispatch = useDispatch();
  let api = useSelector(selectApi);

  /**
   * [extract the query, make the API call via redux and set the state of current search]
   * @return {void}
   */
  const dispatchQuery = () => {
    let searchFor = urlParams.get("q")?.toString();
    if (searchFor) {
      dispatch(getMoviesBySearchAsync(searchFor));
      dispatch(setActualSearch(searchFor));
    }
  };

  //every time there is a new query, we make the call.
  useEffect(dispatchQuery, [urlParams]);

  return (
    <div>
      <div>Hello votre recherche : {api.actual_search}</div>
      <MoviesListt lazy={lazySearch} {...api.search} type="search" />
    </div>
  );
};

export default SearchTest;
