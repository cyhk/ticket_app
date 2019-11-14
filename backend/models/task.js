const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Task {
  /**
   * getAll() returns tasks
   *
   * Input: none
   * Output: { tasks }
   */
  static async getAll() {
    const tasks = await db.query(
      `
      SELECT *
        FROM tasks
        ORDER BY task_id;
      `
    );

    if (!tasks) {
      throw new ExpressError("There was problem getting the tasks");
    }

    return tasks.rows;
  }

  /**
   * add() adds a task to the database
   * Returns the newly added task
   *
   * Input: title, description, [status]
   * Output: { task }
   */
  static async add(
    task_title,
    task_description,
    task_status = "not-done",
    task_ticket_id
  ) {
    const addedTask = await db.query(
      `
        INSERT INTO tasks
          (task_title, task_description, task_status, task_ticket_id)
          VALUES ($1, $2, $3, $4)
          RETURNING task_id, task_title, task_description,
            task_status, task_ticket_id;
      `,
      [task_title, task_description, task_status, task_ticket_id]
    );

    if (addedTask.rowCount === 0) {
      throw new ExpressError("There was a problem adding the task");
    }

    return addedTask.rows[0];
  }

  /**
   * updateStatus() updates a task in the database
   * Returns the updated task
   *
   * Input: id, status
   * Output: { task }
   */
  static async updateStatus(task_id, task_status) {
    const updatedTask = await db.query(
      `
        UPDATE tasks
          SET task_status = $1
          WHERE task_id = $2
          RETURNING task_id, task_title, task_description,
            task_status, task_ticket_id;
      `,
      [task_status, task_id]
    );

    if (updatedTask.rowCount === 0) {
      throw new ExpressError("Task not found");
    }

    return updatedTask.rows[0];
  }
}

module.exports = Task;
