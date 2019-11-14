# Ticket App

In the project directory, you can run:

```
  npm install
  npm start
```
to start the app on http://localhost:3000

## Component Architecture
```
App
├─┬ TicketList
| ├──Ticket
│ └─┬ TaskList
|   ├──Task
|   └─┬ ActionList
|     └───Action
└─┬── TicketForm
  ├── TicketDetails
  ├── TaskDetails
  └── ActionDetails
```