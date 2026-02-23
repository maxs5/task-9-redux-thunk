import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCreateForm from "../components/home/TodoCreateForm";
import TodoPreviewList from "../components/home/TodoPreviewList";
import TodoToolbar from "../components/home/TodoToolbar";
import { useDebounce } from "../hooks/useDebounce";
import { addTodo, clearTodosError, fetchTodos } from "../store/actions/todosActions";
import { setSearchText, toggleSort } from "../store/actions/filterActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector((state) => state.todos);
  const { searchText, sortEnabled } = useSelector((state) => state.filters);
  const [newText, setNewText] = useState("");

  const debouncedSearch = useDebounce(searchText.trim().toLowerCase(), 350);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(debouncedSearch)
    );

    if (!sortEnabled) return filtered;
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
  }, [todos, debouncedSearch, sortEnabled]);

  async function handleCreate(event) {
    event.preventDefault();
    const title = newText.trim();
    if (!title) return;

    try {
      dispatch(clearTodosError());
      await dispatch(addTodo(title));
      setNewText("");
    } catch (_err) {
      // Ошибка уже записана в store todos.error
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Todo List (JSON Server + Router)</h1>

        <TodoCreateForm value={newText} onChange={setNewText} onSubmit={handleCreate} />
        <TodoToolbar
          searchText={searchText}
          onSearch={(value) => dispatch(setSearchText(value))}
          sortEnabled={sortEnabled}
          onToggleSort={() => dispatch(toggleSort())}
        />

        {loading && <p className="status">Загрузка...</p>}
        {!loading && error && <p className="status error">{error}</p>}

        {!loading && <TodoPreviewList todos={visibleTodos} />}
      </section>
    </main>
  );
}
