import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import TaskList from "./TaskList";

/**
 * TicketDetails: displays details of each ticket
 *
 * Props: match (from react-router-dom's routerProps)
 */
function TicketDetails({ match }) {
  const { ticket_id } = match.params;
  const { tickets } = useContext(AppContext);
  const [ticket, setTicket] = useState(null);

  // find and display the correct ticket on mount
  useEffect(() => {
    let foundTicket = null;

    for (const t of tickets) {
      if (t.id === +ticket_id) {
        foundTicket = t;
      }
    }

    setTicket(foundTicket);
  }, [ticket_id, tickets]);

  return (
    ticket && (
      <div>
        <div>{ticket.title}</div>
        <div>{ticket.description}</div>
        <div>{ticket.status}</div>
        {ticket.tasks && <TaskList tasks={ticket.tasks} />}
      </div>
    )
  );
}

export default TicketDetails;
