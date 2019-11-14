DROP TABLE actions;
DROP TABLE tasks;
DROP TABLE tickets;

DROP TYPE tickets_status;
DROP TYPE tasks_status;
DROP TYPE actions_status;

CREATE TYPE tickets_status AS ENUM ('troubleshooting', 'in-progress', 'done');
CREATE TYPE tasks_status AS ENUM ('done', 'not-done');
CREATE TYPE actions_status AS ENUM (
  'sourcing',
  'confirming',
  'in-progress',
  'assessment',
  'complete', 
  'cancelled'
);

CREATE TABLE tickets (
  ticket_id serial PRIMARY KEY,
  ticket_title text NOT NULL,
  ticket_description text,
  ticket_status tickets_status
);

CREATE TABLE tasks (
  task_id serial PRIMARY KEY,
  task_title text NOT NULL,
  task_description text,
  task_status tasks_status,
  task_ticket_id integer REFERENCES tickets(ticket_id) NOT NULL
);

CREATE TABLE actions (
  action_id serial PRIMARY KEY,
  action_title text NOT NULL,
  action_email text NOT NULL,
  action_name text NOT NULL,
  action_status actions_status,
  action_task_id integer REFERENCES tasks(task_id) NOT NULL
);

-- CREATE TABLE tickets_tasks_actions (
--   id serial PRIMARY KEY,
--   ticket_id integer REFERENCES tickets(ticket_id) NOT NULL,
--   task_id integer REFERENCES tasks(task_id),
--   action_id integer REFERENCES actions(action_id),
--   CONSTRAINT if_action_then_task
--     CHECK ( (action_id IS NULL) OR (task_id IS NOT NULL AND action_id IS NOT NULL) ),
--   UNIQUE (ticket_id, task_id, action_id)
-- );

-- dummy data for tickets
INSERT INTO tickets 
(ticket_title, ticket_description, ticket_status)
VALUES ('first ticket', 'this is the first ticket', 'troubleshooting');

INSERT INTO tickets 
(ticket_title, ticket_description, ticket_status)
VALUES ('second ticket', 'this is the second ticket', 'in-progress');

INSERT INTO tickets 
(ticket_title, ticket_description, ticket_status)
VALUES ('third ticket', 'this is the third ticket', 'done');

-- dummy data for tasks
INSERT INTO tasks
(task_title, task_description, task_status, task_ticket_id)
VALUES ('first task', 'first task description', 'not-done', 1);

INSERT INTO tasks
(task_title, task_description, task_status, task_ticket_id)
VALUES ('second task', 'second task description', 'not-done', 1);

INSERT INTO tasks
(task_title, task_description, task_status, task_ticket_id)
VALUES ('third task', 'third task description', 'done', 2);

-- dummy data for actions
INSERT INTO actions
(action_title, action_email, action_name, action_status, action_task_id)
VALUES ('first action',  'hey@there.com', 'Julie', 'sourcing', 1);

INSERT INTO actions
(action_title, action_email, action_name, action_status, action_task_id)
VALUES ('second action', '123@456.com', 'Joe', 'confirming', 1);

INSERT INTO actions
(action_title, action_email, action_name, action_status, action_task_id)
VALUES ('third action',  'test@test.com', 'Mac Test', 'in-progress', 2);

-- -- dummy data for tickets_tasks_actions
-- INSERT INTO tickets_tasks_actions
-- (ticket_id, task_id, action_id)
-- VALUES(2, 2, 2);

-- INSERT INTO tickets_tasks_actions
-- (ticket_id, task_id, action_id)
-- VALUES(1, 3, 3);

-- INSERT INTO tickets_tasks_actions
-- (ticket_id, task_id, action_id)
-- VALUES(1, 2, 3);

-- INSERT INTO tickets_tasks_actions
-- (ticket_id, task_id, action_id)
-- VALUES(1, 2, NULL);

-- -- to do a data migration:
-- UPDATE tickets
-- SET status = 'troubleshooting'
-- WHERE status = 'false'

-- UPDATE tickets
-- SET status = 'done'
-- WHERE status = 'true'

-- ALTER TABLE tickets
-- ALTER COLUMN status TYPE tickets_status;