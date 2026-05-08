import "./style.css";

const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "buy bread", completed: false },
  { id: 1, text: "Buy jam", completed: true },
];

let nextTodoId = 4;
let filter = "all"; // can be all, active, completed

document.addEventListener("DOMContentLoaded", renderTodos);

function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  const filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed) {
      filteredTodos.push(todo);
    } else if (filter === "active" && !todo.completed) {
      filteredTodos.push(todo);
    }
  }

  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoListElement.appendChild(todoItem);

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    todoItem.appendChild(todoEdit);
  }

  const activeHref =
    filter === "active"
      ? todoNav.children[1].href
      : filter === "completed"
        ? todoNav.children[2].href
        : todoNav.children[0].href;
  renderTodoNavBar(activeHref);
}

function handleNewTodoKeyDown(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos.push({ id: nextTodoId++, text: todoText, completed: false });
    newTodoInput.value = "";
    renderTodos();
  }
}

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);

function renderTodoNavBar(href) {
  const elements = todoNav.children;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.href === href) {
      element.classList.add(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    } else {
      element.classList.remove(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    }
  }
}

function handleClickOnNavbar(event) {
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    const action = hrefValue.split("/").pop();
    filter = action === "" ? "all" : action;
    renderTodos();
    renderTodoNavBar(hrefValue);
  }
}

const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavbar);
