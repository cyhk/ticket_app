import React from 'react';
import Action from './Action';

// ActionList: shows each action
// Props: actions (array)
function ActionList({ actions }) {
  const actionsArr = actions.map(a => (
    <Action
      key={a.id}
      id={a.id}
      title={a.title}
      email={a.email}
      name={a.name}
      status={a.status}
    />
  ));

  return <ul>{actionsArr}</ul>;
}

export default ActionList;