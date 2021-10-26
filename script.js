"use strict";
const formAddTask = document.querySelector(".form-add-task");

const inputTask = document.querySelector(".input-add-task");
const btnAddTask = document.querySelector(".btn-add-task");
const taskListEl = document.querySelector(".tasks-list");

let formEditTask = document.querySelector(".form-edit-task");
let btnEditTask = document.querySelector(".btn-edit-task");
let btnsCloseTask = document.querySelectorAll(".btn-delete-task");
let inputEditTask = document.querySelector(".input-edit-task");

let editTaskOldName = "";

const clearTasksBtn = document.querySelector(".btn-clear-tasks");
// let tasksArr = JSON.parse(localStorage.getItem("localTasks"));
let tasksArr = [
  ["task 1", 0],
  ["task 2", 0],
  ["task 3", 0],
  ["task 4", 0],
  ["task 5", 0],
  ["task 6", 0],
];

// loadLocalTasks();

renderTasks();

function addTask(newTask) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i][0] === newTask) return alert("task already present");
  }
  if (newTask !== undefined && newTask !== "") {
    tasksArr.push([newTask, 0]);
    inputTask.value = "";
    inputTask.blur();
    renderTasks();
    // return 1;
  }
}
function renderTasks() {
  taskListEl.innerHTML = "";
  tasksArr.forEach((tempTask) => {
    taskListEl.insertAdjacentHTML(
      "afterbegin",
      ` ${
        tempTask[2] === 1
          ? `<form class='form-edit-task'>
              <input type='text'class='input-edit-task' value='${editTaskOldName}'>
              <button class='btn-edit-task'> Edit Task</button>
            </form>
          `
          : `<li class="task-item ${tempTask[1] === 1 ? "completed" : ""}">
      <div class="task-text">${tempTask[0]}</div>
          <div class="task-buttons">
            <button class="btn btn-checkmark">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </button>
            <button class="btn btn-outline">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button class="btn btn-delete-task">
              <ion-icon name="close-circle-outline"></ion-icon>
            </button>
          </div>
        </li>`
      } 
    `
    );
  });
  // console.log(document.querySelectorAll(".btn-checkmark"));
  clicklistner();
  saveToLocalStorage();
}

function clicklistner() {
  // takes care of deletign task
  btnsCloseTask = document.querySelectorAll(".btn-delete-task");
  btnsCloseTask.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", deletignTasks);
  });

  // takes care of makring tasks completed
  document.querySelectorAll(".btn-checkmark").forEach((checkmarkBtn) => {
    checkmarkBtn.addEventListener("click", completingTasks);
    // renderTasks();
  });

  // takes care of editing tasks

  document.querySelectorAll(".btn-outline").forEach((outlineBtn) => {
    outlineBtn.addEventListener("click", editingtaks);
  });
}

function deletignTasks(e) {
  const selectedText = e.target
    .closest(".task-item")
    .querySelector(".task-text").textContent;
  // console.log(selectedTask);
  // const selectedText = selectedTask;
  console.log(selectedText);

  const index = tasksArr.findIndex((x) => x[0] === selectedText);
  console.log(index);
  if (index !== -1) tasksArr.splice(index, 1);
  renderTasks();
}

function completingTasks(e) {
  const selectedTask = e.target.closest(".task-item");
  console.log(selectedTask);
  selectedTask.classList.add("completed");

  const selectedText = selectedTask.querySelector(".task-text").textContent;
  console.log("selectedText: ", selectedText);

  const index = tasksArr.findIndex((x) => x[0] === selectedText);
  console.log(index);
  tasksArr[index][1] = 1;
}

function editingtaks(e) {
  const selectedTask = e.target.closest(".task-item");
  console.log(selectedTask);

  const selectedText = selectedTask.querySelector(".task-text").textContent;
  console.log("selectedText: ", selectedText);

  const index = tasksArr.findIndex((x) => x[0] === selectedText);
  console.log(index);
  tasksArr[index][2] = 1;
  console.log(tasksArr);
  editTaskOldName = tasksArr[index][0];
  renderTasks();
  // now it is displaying edit task input form
  document.querySelector(".input-edit-task").focus();

  // removing event listners from other white we have an edit task form open
  document.querySelectorAll(".btn-outline").forEach((outlineBtn) => {
    outlineBtn.removeEventListener("click", editingtaks);

    document.querySelectorAll(".btn-checkmark").forEach((checkmarkBtn) => {
      checkmarkBtn.removeEventListener("click", completingTasks);

      btnsCloseTask = document.querySelectorAll(".btn-delete-task");
      btnsCloseTask.forEach((deleteBtn) => {
        deleteBtn.removeEventListener("click", deletignTasks);
      });
    });
  });

  btnEditTask = document.querySelector(".btn-edit-task");
  btnEditTask.addEventListener("click", (e) => {
    btnEditTask = document.querySelector(".btn-edit-task");
    inputEditTask = document.querySelector(".input-edit-task");
    formEditTask = document.querySelector(".form-edit-task");

    formEditTask.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(inputEditTask.value);

      for (let i = 0; i < tasksArr.length; i++)
        if (tasksArr[i][0] === inputEditTask.value)
          return alert("task already present");
      tasksArr[index][0] = inputEditTask.value;
      tasksArr[index][2] = 0;
      renderTasks();
    });
  });
}

clearTasksBtn.addEventListener("click", (e) => (taskListEl.innerHTML = ""));

formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(inputTask.value);
  addTask(inputTask.value);
});

clicklistner();
function saveToLocalStorage() {
  localStorage.setItem("localTasks", JSON.stringify(tasksArr));
}

function loadLocalTasks() {
  tasksArr = JSON.parse(localStorage.getItem("localTasks"));
}
