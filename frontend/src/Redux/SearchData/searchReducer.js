import {SHOW_SEARCH_DATA} from "../constant";

export const singleSearchData = (data = [], action) => {
  switch (action.type) {
    case SHOW_SEARCH_DATA:

      return [action.data];
    default:
      return [];
  }
};