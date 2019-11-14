import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import TicketList from "./TicketList";
import TicketForm from "./TicketForm";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const response = await axios.get("http://localhost:5000/tickets");
      const allTickets = response.data;

      setTickets(allTickets.tickets);
    };

    getTickets();
  }, []);

  async function addTicket(title, description) {
    try {
      // ping api
      const response = await axios.post(`http://localhost:5000/tickets/`, {
        title,
        description
      });
      const addedTicket = response.data;

      // update tickets arr
      const newTickets = [...tickets, addedTicket];

      setTickets(newTickets);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function changeDoneStatus(id, done) {
    // ping api
    const response = await axios.patch(`http://localhost:5000/tickets/${id}`, {
      done
    });
    const updatedTicket = response.data;

    // update tickets arr
    const newTickets = tickets.map(t => {
      if (t.id === id) {
        return updatedTicket;
      }
      return t;
    });

    // console.log(tickets);
    // console.log(newTickets);

    setTickets(newTickets);
  }

  return (
    <div className="App">
      <TicketForm addTicket={addTicket} />
      <TicketList tickets={tickets} changeDoneStatus={changeDoneStatus} />
    </div>
  );
}

export default App;
