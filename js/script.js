"use strict";

let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");
let elTasksBtnAll = document.querySelector(".button-all");
let elTasksBtnCompleted = document.querySelector(".button-completed");
let elTasksBtnUncompleted = document.querySelector(".button-uncompleted");

const todos = [];
let todosCompleted = [];
let todosUncompleted = [];

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let todoBtnId = evt.target.dataset.todoId * 1;

    const foundTodoIndex = todos.findIndex(function (todo) {
      return todo.id === todoBtnId;
    });

    todos.splice(foundTodoIndex, 1);
  } else if (evt.target.matches(".checkbox-btn")) {
    let todoCheckId = evt.target.dataset.checkId * 1;

    const foundCheckbox = todos.find(function (todo) {
      return todo.id === todoCheckId;
    });

    foundCheckbox.isCompleted = !foundCheckbox.isCompleted;
  }

  elList.innerHTML = null;
  renderTodos(todos, elList);

  todosCompleted = todos.filter((todo) => {
    return todo.isCompleted;
  });

  todosUncompleted = todos.filter((todo) => {
    return !todo.isCompleted;
  });

  console.log(todosUncompleted);
  console.log(todosCompleted);

  elTasksBtnAll.textContent = `All ${todos.length}`;
  elTasksBtnCompleted.textContent = `Completed ${todosCompleted.length}`;
  elTasksBtnUncompleted.textContent = `Uncompleted ${todosUncompleted.length}`;
});

const renderTodos = function (arr, element) {
  arr.forEach((todo) => {
    let newLi = document.createElement("li");
    let newLiCheckboxDiv = document.createElement("div");
    let newCheckbox = document.createElement("input");
    let newLabel = document.createElement("label");
    let newDeleteBtn = document.createElement("button");

    newLabel.textContent = todo.title;
    newDeleteBtn.textContent = "Delete";

    newLi.setAttribute("class", "input-group mb-3");
    newLiCheckboxDiv.classList.add("input-group-text");
    newCheckbox.type = "checkbox";
    newCheckbox.setAttribute("class", "checkbox-btn form-check-input");
    newDeleteBtn.classList.add("delete-btn");
    newLabel.classList.add("form-control");
    newDeleteBtn.type = "button";
    newDeleteBtn.setAttribute("class", "delete-btn btn btn-danger");

    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLabel.style.textDecoration = "line-through";
      newLabel.style.fontStyle = "italic";
      newLabel.style.color = "red";
    }

    element.appendChild(newLi);
    newLi.appendChild(newLiCheckboxDiv);
    newLiCheckboxDiv.appendChild(newCheckbox);
    newLi.appendChild(newLabel);
    newLi.appendChild(newDeleteBtn);
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elInput.value.trim();

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  elList.innerHTML = null;
  todos.push(newTodo);
  elInput.value = null;
  renderTodos(todos, elList);

  elTasksBtnAll.textContent = `All ${todos.length}`;
  elTasksBtnCompleted.textContent = `Completed ${todosCompleted.length}`;
  elTasksBtnUncompleted.textContent = `Uncompleted ${todosUncompleted.length}`;
});

elTasksBtnAll.addEventListener("click", function () {
  elList.innerHTML = null;
  renderTodos(todos, elList);
});

elTasksBtnCompleted.addEventListener("click", function () {
  elList.innerHTML = null;
  renderTodos(todosCompleted, elList);
});

elTasksBtnUncompleted.addEventListener("click", function () {
  elList.innerHTML = null;
  renderTodos(todosUncompleted, elList);
});
