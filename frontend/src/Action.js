import React, { useContext } from "react";
import AppContext from "./AppContext";
import { Link } from "react-router-dom";

/**
 * Action: displays an action
 * Props: id, title, email, name, status
 */
function Action({ id, title, email, name, status }) {
  const { changeActionStatus } = useContext(AppContext);

  function handleChange(evt) {
    evt.preventDefault();
    const newStatus = evt.target.value;
    changeActionStatus(id, newStatus);
  }

  return (
    <li>
      <Link to={`/actions/${id}`}>
        <div>{title}</div>
        <div>{email}</div>
        <div>{name}</div>
      </Link>
      <select value={status} onChange={handleChange}>
        <option value="sourcing">Sourcing</option>
        <option value="confirming">Confirming</option>
        <option value="in-progress">In progress</option>
        <option value="assessment">Assessment</option>
        <option value="complete">Complete</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </li>
  );
}

export default Action;
