const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// get all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getAll();

    return res.json({
      tasks
    });
  } catch (err) {
    next(err);
  }
});

// add a task
router.post("/", async (req, res, next) => {
  try {
    const { title, description, status, ticket_id } = req.body;
    const newTask = await Task.add(title, description, status, ticket_id);

    return res.json({
      task: newTask
    });
  } catch (err) {
    next(err);
  }
});

// update task status (done or not done)
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    const updatedTask = await Task.updateStatus(id, status);

    return res.json({
      task: updatedTask
    })

    return 

  } catch (err) {
    next(err);
  }
});

module.exports = router;
