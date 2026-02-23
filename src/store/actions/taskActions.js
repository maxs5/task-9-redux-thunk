import {
  TASK_CLEAR_ERROR,
  TASK_DELETE_SUCCESS,
  TASK_LOADING_ERROR,
  TASK_LOADING_START,
  TASK_LOADING_SUCCESS,
  TASK_SAVE_SUCCESS,
  TODO_DELETE_SUCCESS,
  TODO_UPDATE_SUCCESS
} from "../actionTypes";
import { deleteTodo, getTodoById, updateTodo } from "../../services/todoApi";

export function clearTaskError() {
  return { type: TASK_CLEAR_ERROR };
}

export function loadTaskById(id) {
  return async (dispatch, getState) => {
    dispatch({ type: TASK_LOADING_START });

    try {
      const local = getState().todos.items.find(
        (todo) => String(todo.id) === String(id)
      );

      if (local) {
        dispatch({ type: TASK_LOADING_SUCCESS, payload: local });
        return local;
      }

      const data = await getTodoById(id);
      dispatch({ type: TASK_LOADING_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: TASK_LOADING_ERROR,
        payload: error.message || "Ошибка загрузки задачи"
      });
      throw error;
    }
  };
}

export function saveTask(id, title) {
  return async (dispatch) => {
    try {
      const updated = await updateTodo(id, title);
      dispatch({ type: TASK_SAVE_SUCCESS, payload: updated });
      dispatch({ type: TODO_UPDATE_SUCCESS, payload: updated });
      return updated;
    } catch (error) {
      dispatch({
        type: TASK_LOADING_ERROR,
        payload: error.message || "Ошибка обновления"
      });
      throw error;
    }
  };
}

export function removeTask(id) {
  return async (dispatch) => {
    try {
      await deleteTodo(id);
      dispatch({ type: TASK_DELETE_SUCCESS });
      dispatch({ type: TODO_DELETE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: TASK_LOADING_ERROR,
        payload: error.message || "Ошибка удаления"
      });
      throw error;
    }
  };
}
