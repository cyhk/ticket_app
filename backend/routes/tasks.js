const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


/**
 * get all actions
 * 
 * Output: { tasks }
 */
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

/**
 * Add a task
 * Input (in request body): title, description, [status], ticket_id
 * Output: { task }
 */
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

/**
 * Update task status to not-done, or done
 * 
 * Input (in request body): status
 * Output: { task }
 */
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
