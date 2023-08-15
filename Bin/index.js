const { input, rawlist, select } = require("@inquirer/prompts");
const todos = [];
let iD = 0;

function createTodo() {
  const todo = {};

  console.log("\n\nCreating a todo...");
  input({ message: "Enter the title: " }).then(function (title) {
    todo.title = title;
    todo.id = iD;
    input({ message: "Enter the description: " }).then(function (description) {
      todo.description = description;

      input({ message: "Enter the SubTask: " }).then(function (subtask) {
        todo.subtask = subtask;
        //if()
        //criar uma question para introduzir varias subtasks,
        //e perguntar se se quer criar nova ou sair

        select({
          message: "Select a priority",
          choices: [
            {
              name: "Low",
              value: "Low",
            },
            {
              name: "Medium",
              value: "Medium",
            },
            {
              name: "High",
              value: "High",
            },
          ],
        }).then(function (priority) {
          todo.priority = priority;

          // input({ message: "Enter the Status: " }).then(function (status) {
          //   todo.status = status;
          select({
            message: "Select Status ",
            choices: [
              {
                name: "0%",
                value: "0%",
              },
              {
                name: "25%",
                value: "25%",
              },
              {
                name: "50%",
                value: "50%",
              },
              {
                name: "100%",
                value: "100%",
              },
            ],
          }).then(function (status) {
            todo.status = status;

            // Add the new todo to the db file
            todos.push(todo);

            console.log("\n");
            iD++;
            renderMenu();
          });
        });
      });
    });
  });
}

function printTodos(list) {
  list.forEach(function (todo) {
    console.log("\n===============");
    console.log(todo.id);
    console.log(todo.title);
    console.log(todo.description);
    console.log(todo.priority);
    console.log(todo.subtask);
    console.log(todo.status);
    console.log("===============\n");
  });
}

function listTodos() {
  printTodos(todos);
  renderMenu();
}

function sortByTitle() {
  const todosSortedByTitle = todos.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  printTodos(todosSortedByTitle);
  renderMenu();
}

function sortByPrio() {
  const order = ["High", "Medium", "Low"];
  const todosSortedByPrio = todos.sort(
    (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority)
  );
  printTodos(todosSortedByPrio);
  renderMenu();
}

function filterBiPrio(){


  renderMenu();
}

function renderListMenu() {
  rawlist({
    message: "Listing all TodoList",
    choices: [
      { name: "List all", value: "all" },
      { name: "Sort by Title", value: "sortTitle" },
      { name: "Sort by Priority", value: "sortPrio" },
      { name: "Filter by Priority", value: "filterPrio" },
      { name: "Go back", value: "back" },
    ],
  }).then(function (option) {
    switch (option) {
      case "all":
        listTodos();
        break;
      case "sortTitle":
        sortByTitle();
        break;
      case "sortPrio":
        sortByPrio();
        break;
      case "back":
        renderMenu();
        break;
      default:
        console.log("That is not a valid option");
    }
  });
}

function renderMenu() {
  rawlist({
    message: "Bem vindo à ToDo",
    choices: [
      { name: "Create a ToDo", value: "create" },
      { name: "List all ToDo", value: "list" },
      { name: "Exit", value: "exit" },
    ],
  }).then(function (option) {
    switch (option) {
      case "create":
        createTodo();
        break;
      case "list":
        renderListMenu();
        break;
      default:
        console.log("That is not a valid option");
    }
  });
}

renderMenu();
