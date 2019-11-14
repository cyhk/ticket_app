import React from "react";
import Ticket from "./Ticket";

function TicketList({ tickets, changeDoneStatus }) {
  const ticketsArr = tickets.map(t => (
    <Ticket
      key={t.id}
      id={t.id}
      title={t.title}
      description={t.description}
      done={t.done}
      changeDoneStatus={changeDoneStatus}
    />
  ));

  return <ul>{ticketsArr}</ul>;
}

export default TicketList;
