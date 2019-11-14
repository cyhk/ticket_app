import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import ActionList from "./ActionList";

/**
 * TaskDetails: displays details of each task
 *
 * Props: match (from react-router-dom's routerProps)
 */
function TaskDetails({ match }) {
  const { task_id } = match.params;
  const { tickets } = useContext(AppContext);
  const [task, setTask] = useState(null);

  // find and display the correct task on mount
  useEffect(() => {
    let foundTask = null;

    for (const ticket of tickets) {
      if (ticket.tasks) {
        for (const t of ticket.tasks) {
          if (t.id === +task_id) {
            foundTask = t;
          }
        }
      }
    }

    setTask(foundTask);
  }, [task_id, tickets]);

  return (
    task && (
      <div>
        <div>{task.title}</div>
        <div>{task.description}</div>
        <div>{task.status}</div>
        {task.actions && <ActionList actions={task.actions} />}
      </div>
    )
  );
}

export default TaskDetails;
