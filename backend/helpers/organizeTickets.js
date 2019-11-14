/**
 * organizeTickets turns an array of tickets containing attributes from
 * tickets, tasks, and actions to:
 * [{
 *   ...,
 *   tasks: [{
 *     ...,
 *     actions: [{
 *        ...
 *      }]
 *   }]
 * }]
 * 
 * Input: [{ticket}, ...]
 * Output: [{
 *   ...,
 *   tasks: [{
 *     ...,
 *     actions: [{
 *        ...
 *      }]
 *   }]
 * }]
 */
function organizeTickets(tickets) {
  const organizedTickets = {};
  const organizedTasks = {};
  const organizedActions = {};

  // go through each ticket
  for (const t of tickets) {
    const ticket = {};
    const task = {};
    const action = {};

    // check if key belongs to task or action and
    // add to the task or action object accordingly
    for (const key in t) {
      const splitKey = key.split("_");
      const prefix = splitKey[0];
      const associatedKey = splitKey.splice(1).join("_");

      if (prefix === "task") {
        task[associatedKey] = t[key];
      } else if (prefix === "action") {
        action[associatedKey] = t[key];
      } else {
        ticket[associatedKey] = t[key];
      }
    }

    organizedTickets[ticket.id] = ticket;
    organizedTasks[task.id] = task;
    organizedActions[action.id] = action;
  }

  // put each action in the right task
  for (const action in organizedActions) {
    const currentAction = organizedActions[action];
    if (currentAction.id !== null) {
      const task = organizedTasks[currentAction.task_id];

      if (task.actions === undefined) {
        task.actions = [];
      }
      task.actions.push(currentAction);
    }
  }

  // put each task in the right ticket
  for (const task in organizedTasks) {
    const currentTask = organizedTasks[task];
    if(currentTask.id !== null) {
      const ticket = organizedTickets[currentTask.ticket_id];

      if (ticket.tasks === undefined) {
        ticket.tasks = [];
      }
      ticket.tasks.push(currentTask);
    }
  }

  return Object.values(organizedTickets);
}

module.exports = organizeTickets;
