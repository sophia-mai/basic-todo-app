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

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
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
}

function handleNewTodoKeyDown(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todo.push({ id: nextTodoId++, text: todoText, completed: false });
    newTodoInput.value = "";
    renderTodos();
  }
}

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);
