import { FILTER_SET_SEARCH_TEXT, FILTER_TOGGLE_SORT } from "../actionTypes";

const initialState = {
  searchText: "",
  sortEnabled: false
};

export function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case FILTER_TOGGLE_SORT:
      return {
        ...state,
        sortEnabled: !state.sortEnabled
      };
    default:
      return state;
  }
}
