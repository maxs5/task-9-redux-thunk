import {
  TASK_CLEAR_ERROR,
  TASK_DELETE_SUCCESS,
  TASK_LOADING_ERROR,
  TASK_LOADING_START,
  TASK_LOADING_SUCCESS,
  TASK_SAVE_SUCCESS
} from "../actionTypes";

const initialState = {
  currentTask: null,
  loading: true,
  error: ""
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TASK_LOADING_START:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case TASK_LOADING_SUCCESS:
      return {
        ...state,
        currentTask: action.payload,
        loading: false,
        error: ""
      };
    case TASK_SAVE_SUCCESS:
      return {
        ...state,
        currentTask: action.payload,
        loading: false,
        error: ""
      };
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        currentTask: null,
        loading: false,
        error: ""
      };
    case TASK_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case TASK_CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
}
