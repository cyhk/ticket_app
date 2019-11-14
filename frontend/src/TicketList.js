import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";

// TicketList: shows each ticket
// Props: tickets (array)
function TicketList({ tickets }) {
  const [filter, setFilter] = useState("incomplete");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  // set filter
  function handleChange(evt) {
    evt.preventDefault();

    const newFilter = evt.target.value;
    setFilter(newFilter);
  }

  // whenever filter changes, update the filteredTasks according
  // to the filter option
  useEffect(() => {
    let filtered;
    if (filter === "incomplete") {
      filtered = tickets.filter(t => t.status !== "done");
    } else if (filter === "done") {
      filtered = tickets.filter(t => t.status === "done");
    } else if (filter === "all") {
      filtered = tickets;
    }
    setFilteredTickets(filtered);
  }, [filter, tickets]);

  // generate ticket list
  const ticketsArr = filteredTickets.map(t => (
    <Ticket
      key={t.id}
      id={t.id}
      title={t.title}
      description={t.description}
      status={t.status}
      tasks={t.tasks}
    />
  ));

  return (
    <div>
      <select value={filter} onChange={handleChange}>
        <option value="incomplete">Incomplete</option>
        <option value="done">Done</option>
        <option value="all">All</option>
      </select>
      <ul>{ticketsArr}</ul>
    </div>
  );
}

export default TicketList;
