import {
  TODO_CREATE_SUCCESS,
  TODO_DELETE_SUCCESS,
  TODOS_CLEAR_ERROR,
  TODOS_LOADING_ERROR,
  TODOS_LOADING_START,
  TODOS_LOADING_SUCCESS,
  TODO_UPDATE_SUCCESS
} from "../actionTypes";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from "../../services/todoApi";

export function clearTodosError() {
  return { type: TODOS_CLEAR_ERROR };
}

export function fetchTodos() {
  return async (dispatch) => {
    dispatch({ type: TODOS_LOADING_START });

    try {
      const list = await getTodos();
      dispatch({ type: TODOS_LOADING_SUCCESS, payload: list });
    } catch (error) {
      dispatch({
        type: TODOS_LOADING_ERROR,
        payload: error.message || "Ошибка загрузки"
      });
      throw error;
    }
  };
}

export function addTodo(title) {
  return async (dispatch) => {
    try {
      const created = await createTodo(title);
      dispatch({ type: TODO_CREATE_SUCCESS, payload: created });
      return created;
    } catch (error) {
      dispatch({
        type: TODOS_LOADING_ERROR,
        payload: error.message || "Ошибка добавления"
      });
      throw error;
    }
  };
}

export function editTodo(id, title) {
  return async (dispatch) => {
    try {
      const updated = await updateTodo(id, title);
      dispatch({ type: TODO_UPDATE_SUCCESS, payload: updated });
      return updated;
    } catch (error) {
      dispatch({
        type: TODOS_LOADING_ERROR,
        payload: error.message || "Ошибка обновления"
      });
      throw error;
    }
  };
}

export function removeTodo(id) {
  return async (dispatch) => {
    try {
      await deleteTodo(id);
      dispatch({ type: TODO_DELETE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: TODOS_LOADING_ERROR,
        payload: error.message || "Ошибка удаления"
      });
      throw error;
    }
  };
}
