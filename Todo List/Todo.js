const todoInput = document.getElementById("todo_input");
const addTaskButton = document.getElementById("add_todo_button");
const saveTaskButton = document.getElementById("save_todo_button");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");


let todoArray = [];

//Event Listeners
saveTaskButton.addEventListener("click", saveTodo);
addTaskButton.addEventListener("click", addTodo); 


//Functions
function addTodo(event){
  event.preventDefault();
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  todoArray.push(todoInput.value);
  todoInput.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function displayTodo(){
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let todoItem = "";
  todoArray.forEach((list, ind) => {
    todoItem += `<div class='todo'>
    <p class='todo_item'>${list}</p>
    <button onclick='editTodo(${ind})' class='edit-btn'><i class='fas fa-edit'></i></button>
    <button onclick='deleteTodo(${ind})' class='delete-btn'><i class='fas fa-trash'></i></button>
    </div>`;
  });
  listBox.innerHTML = todoItem;
}

function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function editTodo(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoInput.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}
   
   
function saveTodo(){
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = saveInd.value;
  todoArray[id] = todoInput.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  todoInput.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}