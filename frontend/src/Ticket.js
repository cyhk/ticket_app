import React from "react";

function Ticket({ id, title, description, done, changeDoneStatus }) {
  function changeDone(evt) {
    evt.preventDefault();

    const doneStatus = evt.target.value;
    changeDoneStatus(id, doneStatus);
  }

  return (
    <li>
      <div>Title: {title}</div>
      <div>Description: {description || "None"}</div>

      <select value={done} onChange={changeDone}>
        <option value="troubleshooting">Troubleshooting</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </li>
  );
}

export default Ticket;
