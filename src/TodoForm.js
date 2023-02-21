import { useState } from "react";
import dayJs from "dayjs";
import propTypes from "prop-types";

const defaultFormState = {
  text: "",
  dueDate: "",
  completed: false,
};

const TodoForm = ({ handleSave, initialFormState }) => {
  const [formState, setFormState] = useState(
    initialFormState || defaultFormState
  );

  const isFormDisabled = formState.text === "";

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddClick() {
    if (isFormDisabled) return;
    const { id, text, dueDate, completed } = formState;

    handleSave({
      id,
      text,
      dueDate: dueDate ? dayJs(dueDate).unix() : null,
      completed,
    });
    clearForm();
  }

  function clearForm() {
    setFormState(initialFormState || defaultFormState);
  }

  return (
    <div className="form-wrapper">
      <input
        type="text"
        name="text"
        value={formState.text}
        placeholder="Create a new todo"
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dueDate"
        value={formState.dueDate}
        placeholder="Set a due date"
        onChange={handleInputChange}
      />
      <button
        className="primary-button"
        onClick={handleAddClick}
        disabled={isFormDisabled}
      >
        {initialFormState?.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

TodoForm.propTypes = {
  handleSave: propTypes.func.isRequired,
  initialFormState: propTypes.shape({
    text: propTypes.string.isRequired,
    dueDate: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  }),
};

export default TodoForm;
