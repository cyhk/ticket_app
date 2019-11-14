import React, { useContext } from "react";
import ActionList from "./ActionList";
import AppContext from "./AppContext";
import { Link } from 'react-router-dom';

/**
 * Task: displays a task
 * Props: id, title, description, status, actions
 */
function Task({ id, title, description, status, actions }) {
  const { changeTaskStatus } = useContext(AppContext);

  function handleChange(evt) {
    evt.preventDefault();
    const newStatus = evt.target.checked ? "done" : "not-done";
    changeTaskStatus(id, newStatus);
  }

  return (
    <li>
      <Link to={`/tasks/${id}`}>
        <div>{title}</div>
        <div>{description}</div>
        <input
          type="checkbox"
          checked={status === "done"}
          onChange={handleChange}
        />
      </Link>
      {actions && <ActionList actions={actions} />}
    </li>
  );
}

export default Task;
