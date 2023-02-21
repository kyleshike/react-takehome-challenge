import TodoItem from "./TodoItem";
import propTypes from "prop-types";

const TodoList = ({ list, handleRemove, handleUpdate }) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="todo-list">
          {list.map((entry, index) => (
            <TodoItem
              key={`todo_${entry.id}`}
              todo={entry}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </>
  );
};

TodoList.propTypes = {
  list: propTypes.arrayOf(
    propTypes.shape({
      completed: propTypes.bool.isRequired,
      dueDate: propTypes.number,
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
    })
  ).isRequired,
  handleRemove: propTypes.func.isRequired,
  handleUpdate: propTypes.func.isRequired,
};

export default TodoList;
