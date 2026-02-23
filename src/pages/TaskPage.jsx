import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TaskEditor from "../components/task/TaskEditor";
import {
  clearTaskError,
  loadTaskById,
  removeTask,
  saveTask
} from "../store/actions/taskActions";
import { clearTodosError } from "../store/actions/todosActions";

export default function TaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentTask: todo, loading, error } = useSelector((state) => state.task);

  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await dispatch(loadTaskById(id));
        if (!data) {
          navigate("/404", { replace: true });
          return;
        }
        setTaskText(data.title);
      } catch (_err) {
        navigate("/404", { replace: true });
      }
    }

    loadTask();
  }, [dispatch, id, navigate]);

  async function handleSave(event) {
    event.preventDefault();
    const title = taskText.trim();
    if (!title) return;

    try {
      dispatch(clearTodosError());
      dispatch(clearTaskError());
      const updated = await dispatch(saveTask(todo.id, title));
      setTaskText(updated.title);
    } catch (_err) {
      // Ошибка уже записана в store task.error
    }
  }

  async function handleDelete() {
    try {
      dispatch(clearTodosError());
      dispatch(clearTaskError());
      await dispatch(removeTask(todo.id));
      navigate("/", { replace: true });
    } catch (_err) {
      // Ошибка уже записана в store task.error
    }
  }

  return (
    <main className="page">
      <section className="card">
        <button className="backButton" type="button" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        {loading && <p className="status">Загрузка задачи...</p>}
        {!loading && error && <p className="status error">{error}</p>}

        {!loading && todo && (
          <TaskEditor
            value={taskText}
            onChange={setTaskText}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}
