const { input, rawlist, select } = require("@inquirer/prompts");
const todos = [];
function createTodo() {
  const todo = {};

  console.log("\n\nCreating a todo...");
  input({ message: "Enter the title: " }).then(function (title) {
    todo.title = title;

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
              value: "1",
            },
            {
              name: "Medium",
              value: "2",
            },
            {
              name: "High",
              value: "3",
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
                value: "1",
              },
              {
                name: "25%",
                value: "2",
              },
              {
                name: "50%",
                value: "3",
              },
              {
                name: "100%",
                value: "4",
              }
            ],
          }).then(function (status) {
            todo.status = status;

            // Add the new todo to the db file
            todos.push(todo);

            console.log("\n");

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

function renderListMenu() {
  rawlist({
    message: "Listing all TodoList",
    choices: [
      { name: "List all", value: "all" },
      { name: "Sort by Title", value: "sortTitle" },
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
