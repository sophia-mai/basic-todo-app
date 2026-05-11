import "../style.css";

// Get the necessary DOM elements
const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

// Define the state of our app
let todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // can be 'all', 'active', or 'completed'

// Helper function to create todo text element
const createTodoText = (todo) => {
  const todoText = document.createElement("div");
  todoText.id = `todo-text-${todo.id}`;
  todoText.classList.add(
    "todo-text",
    ...(todo.completed ? ["line-through"] : []),
  );
  todoText.innerText = todo.text;
  return todoText;
};

// Helper function to create todo edit input element
const createTodoEditInput = (todo) => {
  const todoEdit = document.createElement("input");
  todoEdit.classList.add("hidden", "todo-edit");
  todoEdit.value = todo.text;
  return todoEdit;
};

// Helper function to create a todo item
const createTodoItem = (todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoItem.append(createTodoText(todo), createTodoEditInput(todo));
  return todoItem;
};

// Helper function to filter todos based on the current filter setting
const filterTodos = (todos, filter) => {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  } else {
    return [...todos];
  }
};

// Helper function to create a new array with the existing todos and a new todo item
const addTodo = (todos, newTodoText) => [
  ...todos,
  { id: nextTodoId++, text: newTodoText, completed: false },
];

// Helper function to toggle the completed status of a todo item
const toggleTodo = (todos, todoId) =>
  todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  );

// Function to render the todos based on the current filter
const renderTodos = () => {
  todoListElement.replaceChildren(
    ...filterTodos(todos, filter).map(createTodoItem),
  );
};

// Event handler to create a new todo item
const handleKeyDownToCreateNewTodo = (event) => {
  if (event.key === "Enter") {
    const todoText = event.target.value.trim();
    if (todoText) {
      todos = addTodo(todos, todoText);
      event.target.value = ""; // Clear the input
      renderTodos();
    }
  }
};

// Helper function to update the class list of a navbar element
const updateClassList = (element, isActive) => {
  const classes = [
    "underline",
    "underline-offset-4",
    "decoration-rose-800",
    "decoration-2",
  ];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
};

// Helper function to render the navbar anchor elements
const renderTodoNavBar = (href) => {
  Array.from(todoNav.children).forEach((element) => {
    updateClassList(element, element.href === href);
  });
};

// Event handler to filter the todos based on the navbar selection
const handleClickOnNavbar = (event) => {
  if (event.target.tagName === "A") {
    const href = event.target.href;
    filter = href.split("/").pop() || "all";
    renderTodos();
    renderTodoNavBar(href);
  }
};

// Event handler to toggle the completed status of a todo item
const handleClickOnTodoList = (event) => {
  if (event.target.id.includes("todo-text")) {
    const todoId = event.target.id.split("-").pop();
    todos = toggleTodo(todos, Number(todoId));
    renderTodos();
  }
};

// Event listeners
todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos);
