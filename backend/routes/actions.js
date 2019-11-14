const express = require("express");
const router = express.Router();
const Action = require("../models/Action");


/**
 * get all actions
 * 
 * Output: { actions }
 */
router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.getAll();

    return res.json({
      actions
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Add an action
 * Input (in request body): title, email, name, [status], task_id
 * Output: { action }
 */
router.post("/", async (req, res, next) => {
  try {
    const { title, email, name, status, task_id } = req.body;

    const newAction = await Action.add(title, email, name, status, task_id);

    return res.json({
      action: newAction
    })
  } catch (err) {
    next(err);
  }
});

/**
 * Update action status to sourcing, confirming, 
 * in-progress, assessment, complete, or cancelled
 * 
 * Input (in request body): status
 * Output: { action }
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    const updatedAction = await Action.updateStatus(id, status);

    return res.json({
      action: updatedAction
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;
