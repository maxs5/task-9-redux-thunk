import { FILTER_SET_SEARCH_TEXT, FILTER_TOGGLE_SORT } from "../actionTypes";

export function setSearchText(value) {
  return {
    type: FILTER_SET_SEARCH_TEXT,
    payload: value
  };
}

export function toggleSort() {
  return {
    type: FILTER_TOGGLE_SORT
  };
}
