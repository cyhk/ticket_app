const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Ticket {
  /**
   * getAll() returns tickets
   *
   * Input: none
   * Output: { tickets }
   */
  static async getAll() {
    const tickets = await db.query(
      `
      SELECT *
        FROM tickets
          LEFT OUTER JOIN (
            SELECT *
              FROM tasks
              LEFT OUTER JOIN actions
                ON tasks.task_id = actions.action_task_id
          ) AS tasks_with_actions
          ON tickets.ticket_id = tasks_with_actions.task_ticket_id
        ORDER BY ticket_id, task_id, action_id;
      `
    );

    if (!tickets) {
      throw new ExpressError("There was problem getting the tickets");
    }

    return tickets.rows;
  }

  /**
   * add() adds a ticket to the database
   * Returns the newly added ticket
   *
   * Input: title, description, [status]
   * Output: { ticket }
   */
  static async add(
    ticket_title,
    ticket_description,
    ticket_status = "troubleshooting"
  ) {
    const addedTicket = await db.query(
      `
        INSERT INTO tickets
          (ticket_title, ticket_description, ticket_status)
          VALUES ($1, $2, $3)
          RETURNING ticket_id, ticket_title, ticket_description, ticket_status;
      `,
      [ticket_title, ticket_description, ticket_status]
    );

    if (addedTicket.rowCount === 0) {
      throw new ExpressError("There was a problem adding the ticket");
    }

    return addedTicket.rows[0];
  }

  /**
   * updateStatus() updates a ticket in the database
   * Returns the updated ticket
   *
   * Input: id, status
   * Output: { ticket }
   */
  static async updateStatus(ticket_id, ticket_status) {
    const updatedTicket = await db.query(
      `
        UPDATE tickets
          SET ticket_status = $1
          WHERE ticket_id = $2
          RETURNING ticket_id, ticket_title, ticket_description, ticket_status;
      `,
      [ticket_status, ticket_id]
    );

    if (updatedTicket.rowCount === 0) {
      throw new ExpressError("Ticket not found");
    }

    return updatedTicket.rows[0];
  }
}

module.exports = Ticket;
