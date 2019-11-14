import React, { useContext } from "react";
import TaskList from "./TaskList";
import AppContext from "./AppContext";
import { Link } from 'react-router-dom';

/**
 * Ticket: displays a task
 * Props: id, title, description, status, tasks
 */
function Ticket({ id, title, description, status, tasks }) {
  const { changeTicketStatus } = useContext(AppContext);

  function handleChange(evt) {
    evt.preventDefault();

    const doneStatus = evt.target.value;
    changeTicketStatus(id, doneStatus);
  }

  return (
    <li>
    <Link to={`/tickets/${id}`}>
        <div>Title: {title}</div>
        <div>Description: {description || "None"}</div>
      </Link>
      <select value={status} onChange={handleChange}>
        <option value="troubleshooting">Troubleshooting</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      {tasks && <TaskList tasks={tasks} />}
    </li>
  );
}

export default Ticket;
