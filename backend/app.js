const express = require("express");
const ExpressError = require("./helpers/ExpressError");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// for processing JSON
app.use(express.json());

// for allowing cross origin access
app.use(cors());

// for logging
app.use(morgan("tiny"));

// add routes for tickets, tasks, and actions
const ticketRoutes = require("./routes/tickets");
const taskRoutes = require("./routes/tasks");
const actionRoutes = require("./routes/actions");

app.use("/tickets", ticketRoutes);
app.use("/tasks", taskRoutes);
app.use("/actions", actionRoutes);

// 404 for all unspecified routes
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);

  // pass error onto next middleware
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    error: err.message
  });
})

module.exports = app;

