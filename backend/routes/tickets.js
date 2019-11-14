const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");


/**
 * get all actions
 * 
 * Output: { tickets }
 */
router.get("/", async (req, res, next) => {
  try {
    const tickets = await Ticket.getAll();

    return res.json({
      tickets
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Add a ticket
 * Input (in request body): title, description, [status]
 * Output: { ticket }
 */
router.post("/", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const addedTicket = await Ticket.add(title, description, status);

    return res.json({
      ticket: addedTicket
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Update ticket status to troubleshooting, in-progress, or done
 * 
 * Input (in request body): status
 * Output: { ticket }
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updatedTicket = await Ticket.updateStatus(id, status);

    return res.json({
      ticket: updatedTicket
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
