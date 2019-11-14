import React from "react";
import { Route, Switch } from "react-router-dom";
import TicketForm from "./TicketForm";
import TicketDetails from "./TicketDetails";
import TaskDetails from "./TaskDetails";
import ActionDetails from "./ActionDetails";
import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <div>Pick something from the left</div>} />
      <Route exact path="/tickets/new" render={() => <TicketForm />} />
      <Route
        exact
        path="/tickets/:ticket_id"
        render={rtProps => <TicketDetails {...rtProps} />}
      />
      <Route
        exact
        path="/tasks/:task_id"
        render={rtProps => <TaskDetails {...rtProps} />}
      />
      <Route
        exact
        path="/actions/:action_id"
        render={rtProps => <ActionDetails {...rtProps} />}
      />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}

export default Routes;
