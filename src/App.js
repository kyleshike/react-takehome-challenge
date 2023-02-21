import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = ({ text, dueDate, completed }) => {
    setTodos([...todos, { completed, dueDate, id: uuidv4(), text }]);
  };

  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter(({ id }) => id !== todoId));
  };

  const updateTodo = (todo) => {
    setTodos((prev) => prev.map((item) => (item.id === todo.id ? todo : item)));
  };

  return (
    <div className="App">
      <h1>React Todo App</h1>
      <TodoForm handleSave={addTodo} />
      <TodoList
        list={todos}
        handleRemove={deleteTodo}
        handleUpdate={updateTodo}
      />
    </div>
  );
};

export default App;
