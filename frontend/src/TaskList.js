import React from 'react';
import Task from './Task';

// TaskList: shows each task
// Props: tasks (array)
function TaskList({ tasks }) {
  const tasksArr = tasks.map(t => (
    <Task
      key={t.id}
      id={t.id}
      title={t.title}
      description={t.description}
      status={t.status}
      actions={t.actions}
    />
  ));

  return <ul>{tasksArr}</ul>;
}

export default TaskList;