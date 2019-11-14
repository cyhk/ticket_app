import React, { useState, useContext } from "react";
import AppContext from "./AppContext";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTicket } = useContext(AppContext);

  function changeTitle(evt) {
    const newTitle = evt.target.value;
    setTitle(newTitle);
  }

  function changeDescription(evt) {
    const newDescription = evt.target.value;
    setDescription(newDescription);
  }

  async function handleAdd(evt) {
    evt.preventDefault();
    const result = await addTicket(title, description);
    if (result) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleAdd}>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        placeholder="Add ticket title"
        onChange={changeTitle}
      />
      <input
        id="description"
        name="description"
        type="text"
        value={description}
        placeholder="Add ticket description"
        onChange={changeDescription}
      />
      <button>Add</button>
    </form>
  );
}

export default TicketForm;
