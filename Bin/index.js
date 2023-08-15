const { input, rawlist, select } = require("@inquirer/prompts");
const todos = [];
function createTodo() {
  const todo = {};

  console.log("\n\nCreating a todo...");
  input({ message: "Enter the title: " }).then(function (title) {
    todo.title = title;

    const dataTodo = new Date();
    const dataCriacaoTodo = new Date(dataTodo);
    todo.dataTodo = dataTodo;
    console.log(`Lista criada em ${dataTodo}`);

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

          // const dataMax = new Date();
          const dataMaxEntrega = new Date();

          if (priority === "Low") {
            dataMaxEntrega.setDate(dataMaxEntrega.getDate() + 10);
          } else if (priority === "Medium") {
            dataMaxEntrega.setDate(dataMaxEntrega.getDate() + 20);
          } else if (priority === "High") {
            dataMaxEntrega.setDate(dataMaxEntrega.getDate() + 30);
          }

          todo.dataMaxEntrega = dataMaxEntrega;
          console.log(`Data maxima para conclusão ${dataMaxEntrega}`);

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
              },
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
    console.log(`Lista criada em ${todo.dataTodo}`);
    console.log(todo.title);
    console.log(todo.description);
    console.log(todo.priority);
    console.log(todo.subtask);
    console.log(todo.status);
    console.log(`Data conclusão: ${todo.dataMax}`);
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
