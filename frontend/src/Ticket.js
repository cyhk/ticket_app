import React, { useContext } from "react";
import TaskList from "./TaskList";
import AppContext from "./AppContext";
import { Link } from "react-router-dom";

/**
 * Ticket: displays a task
 * Props: id, title, description, status, tasks
 */
function Ticket({ id, title, description, status, tasks, location }) {
  const filter_choice = location.search;
  const filter_query = filter_choice
    ? filter_choice.split("=")[1]
    : "incomplete";
    
  const { changeTicketStatus } = useContext(AppContext);

  function handleChange(evt) {
    evt.preventDefault();

    const doneStatus = evt.target.value;
    changeTicketStatus(id, doneStatus);
  }

  return (
    <li>
      <Link to={`/tickets/${id}?filter=${filter_query}`}>
        <div>Title: {title}</div>
      </Link>
      <div>Description: {description || "None"}</div>
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
