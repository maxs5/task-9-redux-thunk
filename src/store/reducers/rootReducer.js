import { combineReducers } from "redux";
import { filtersReducer } from "./filtersReducer";
import { taskReducer } from "./taskReducer";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
  task: taskReducer
});
