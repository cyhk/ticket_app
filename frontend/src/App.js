import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Routes from "./Routes";
import TicketList from "./TicketList";
import AppContext from "./AppContext";
import axios from "axios";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);

  // get all tickets on mount
  useEffect(() => {
    const getTickets = async () => {
      const response = await axios.get("http://localhost:5000/tickets");
      const allTickets = response.data;

      setTickets(allTickets.tickets);
    };

    getTickets();
  }, []);

  // add a ticket
  async function addTicket(title, description) {
    try {
      // ping api
      const response = await axios.post(`http://localhost:5000/tickets/`, {
        title,
        description
      });
      const addedTicket = response.data.ticket;

      // update tickets arr
      const newTickets = [...tickets, addedTicket];

      setTickets(newTickets);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // add a task
  async function addTask(title, description) {
    // try {
    //   // ping api
    //   const response = await axios.post(`http://localhost:5000/tasks/`, {
    //     title,
    //     description
    //   });
    //   const addedTask = response.data.task;
    //   // update tasks arr
    //   const newTickets = tickets.map(t => {
    //     if (t.id === addedTask.task_ticket_id) {
    //       return {
    //         ...t,
    //         tasks: [...t.tasks, addedTask]
    //       };
    //     }
    //     return t;
    //   });
    //   setTickets(newTickets);
    //   return true;
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }
  }

  // add an action
  async function addAction(title, description) {
    // try {
    //   // ping api
    //   const response = await axios.post(`http://localhost:5000/tasks/`, {
    //     title,
    //     description
    //   });
    //   const addedTask = response.data.task;
    //   console.log(addedTask);
    //   // // update tasks arr
    //   // const newTasks = [...tickets, addedTask];
    //   // setTickets(newTickets);
    //   return true;
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }
  }

  // update ticket status
  async function changeTicketStatus(id, status) {
    // ping api
    const response = await axios.patch(`http://localhost:5000/tickets/${id}`, {
      status
    });
    const updatedTicket = response.data.ticket;

    // update tickets arr
    const newTickets = tickets.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: updatedTicket.ticket_status
        };
      }
      return t;
    });

    setTickets(newTickets);
  }

  // update task status
  async function changeTaskStatus(id, status) {
    // ping api
    const response = await axios.patch(`http://localhost:5000/tasks/${id}`, {
      status
    });
    const updatedTask = response.data.task;

    const _updateTask = task => {
      if (task.id === id) {
        return {
          ...task,
          status: updatedTask.task_status
        };
      }
      return task;
    };

    // update task status in tickets arr
    const newTickets = tickets.map(t => {
      if (t.id === updatedTask.task_ticket_id) {
        return {
          ...t,
          tasks: t.tasks.map(_updateTask)
        };
      }
      return t;
    });

    setTickets(newTickets);
  }

  // update action status
  async function changeActionStatus(id, status) {
    // ping api
    const response = await axios.patch(`http://localhost:5000/actions/${id}`, {
      status
    });
    const updatedAction = response.data.action;

    const _updateAction = a => {
      if (a.id === updatedAction.action_id) {
        return {
          ...a,
          status: updatedAction.action_status
        };
      }
      return a;
    };

    // update action status in tickets arr
    const newTickets = tickets.map(t => {
      return {
        ...t,
        tasks:
          t.tasks &&
          t.tasks.map(task => {
            if (task.id === updatedAction.action_task_id) {
              return {
                ...task,
                actions: task.actions && task.actions.map(_updateAction)
              };
            }
            return task;
          })
      };
    });

    setTickets(newTickets);
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          tickets,
          changeTicketStatus,
          changeTaskStatus,
          changeActionStatus,
          addTicket,
          addTask,
          addAction
        }}
      >
        <div className="App-left-half">
          <Route render={(rtProps) => <TicketList {...rtProps} tickets={tickets}/>} />
        </div>
        <div className="App-right-half">
          <Routes />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
