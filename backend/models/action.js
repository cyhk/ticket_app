const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Action {
  /**
   * getAll() returns actions
   *
   * Input: none
   * Output: { actions }
   */
  static async getAll() {
    const actions = await db.query(
      `
      SELECT *
        FROM actions
        ORDER BY action_id
      `
    );

    if (!actions) {
      throw new ExpressError("There was problem getting the actions");
    }

    return actions.rows;
  }

  /**
   * add() adds an action to the database
   * Returns the newly added action
   *
   * Input: action_title, action_email, action_name, [action_status]
   * Output: { action }
   */
  static async add(
    action_title,
    action_email,
    action_name,
    action_status = "sourcing",
    action_task_id
  ) {
    const added_action = await db.query(
      `
        INSERT INTO actions
          (action_title, action_email, action_name, action_status, action_task_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING action_id, action_title, action_email,
            action_name, action_status, action_task_id;
      `,
      [action_title, action_email, action_name, action_status, action_task_id]
    );

    if (added_action.rowCount === 0) {
      throw new ExpressError("There was a problem adding the action");
    }

    return added_action.rows[0];
  }

  /**
   * updateStatus() updates anaction in the database
   * Returns the updated action
   *
   * Input: id, status
   * Output: { action }
   */
  static async updateStatus(action_id, action_status) {
    const updated_action = await db.query(
      `
        UPDATE actions
          SET action_status = $1
          WHERE action_id = $2
          RETURNING action_id, action_title, action_email,
            action_name, action_status;
      `,
      [action_status, action_id]
    );

    if (updated_action.rowCount === 0) {
      throw new ExpressError("Action not found");
    }

    return updated_action.rows[0];
  }
}

module.exports = Action;
