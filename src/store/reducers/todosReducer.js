import {
  TODO_CREATE_SUCCESS,
  TODO_DELETE_SUCCESS,
  TODOS_CLEAR_ERROR,
  TODOS_LOADING_ERROR,
  TODOS_LOADING_START,
  TODOS_LOADING_SUCCESS,
  TODO_UPDATE_SUCCESS
} from "../actionTypes";

const initialState = {
  items: [],
  loading: true,
  error: ""
};

export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case TODOS_LOADING_START:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case TODOS_LOADING_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: ""
      };
    case TODO_CREATE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        error: ""
      };
    case TODO_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        error: ""
      };
    case TODO_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((todo) => todo.id !== action.payload),
        error: ""
      };
    case TODOS_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case TODOS_CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
}
