import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";

/**
 * ActionDetails: displays details of each action
 * 
 * Props: match (from react-router-dom's routerProps)
 */
function ActionDetails({ match }) {
  const { action_id } = match.params;
  const { tickets } = useContext(AppContext);
  const [action, setAction] = useState(null);

  // find and display the correct action on mount
  useEffect(() => {
    let foundAction = null;

    for (const ticket of tickets) {
      if (ticket.tasks) {
        for (const task of ticket.tasks) {
          const actions = task.actions;
          if (actions) {
            for (const a of actions) {
              if (a.id === +action_id) {
                foundAction = a;
              }
            }
          }
        }
      }
    }

    setAction(foundAction);
  }, [action_id, tickets]);

  return (
    action && (
      <div>
        <div>{action.title}</div>
        <div>{action.name}</div>
        <div>{action.email}</div>
        <div>{action.email}</div>
        <div>{action.status}</div>
      </div>
    )
  );
}

export default ActionDetails;
