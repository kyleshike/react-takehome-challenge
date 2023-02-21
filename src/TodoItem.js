import { useState } from "react";
import dayjs from "dayjs";
import cx from "classnames";
import propTypes from "prop-types";
import TodoForm from "./TodoForm";

const TodoItem = ({ todo, handleRemove, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isOverdue =
    !todo.completed && todo.dueDate && todo.dueDate < dayjs().unix();

  function onDeleteClick() {
    handleRemove(todo.id);
  }

  function onSaveClick(data) {
    setIsEditing(false);
    handleUpdate(data);
  }

  function handleCompleteClick() {
    handleUpdate({ ...todo, completed: true });
  }

  function handleIncompleteClick() {
    handleUpdate({ ...todo, completed: false });
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelEditClick() {
    setIsEditing(false);
  }

  if (isEditing) {
    const formState = {
      ...todo,
      dueDate: todo.dueDate
        ? dayjs.unix(todo.dueDate).format("YYYY-MM-DD")
        : "",
    };

    return (
      <div className="todo todo-editing">
        <TodoForm handleSave={onSaveClick} initialFormState={formState} />
        <button className="danger-button" onClick={handleCancelEditClick}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      className={cx("todo", { overdue: isOverdue, completed: todo.completed })}
    >
      <div className="todo-entry">
        {todo.text}
        {todo.dueDate && (
          <small>
            <i>Due: {dayjs.unix(todo.dueDate).format("YYYY-MM-DD")}</i>
          </small>
        )}
      </div>
      {todo.completed ? (
        <button className="success-button" onClick={handleIncompleteClick}>
          Mark incomplete
        </button>
      ) : (
        <button className="success-button" onClick={handleCompleteClick}>
          Mark complete
        </button>
      )}
      <button className="primary-button" onClick={handleEditClick}>
        Edit
      </button>
      <button className="danger-button" onClick={onDeleteClick}>
        Delete
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: propTypes.shape({
    completed: propTypes.bool.isRequired,
    dueDate: propTypes.number,
    id: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
  }).isRequired,
  handleRemove: propTypes.func.isRequired,
  handleUpdate: propTypes.func.isRequired,
};

export default TodoItem;
