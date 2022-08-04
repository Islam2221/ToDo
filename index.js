const dom = {
  addTaskBtn: document.querySelector("#add-task-btn"),
  descTaskInput: document.querySelector("#description-task"),
  todosWrapper: document.querySelector(".todos-wrapper"),
  countTask: document.querySelector(".count-task"),
};

// Создаем массив задачь
const key = "todos";
let todos;
let todoItem = [];

// Проверка хранилища на присутствие массива
!localStorage.todos
  ? (todos = [])
  : (todos = JSON.parse(localStorage.getItem(key)));

function updateStorage() {
  localStorage.setItem(key, JSON.stringify(todos));
}

// Функция конструктор, создает объект
function TodoConstructor(description) {
  this.description = description;
  this.isDone = false;
}

dom.addTaskBtn.addEventListener("click", () => {
  const inp = dom.descTaskInput;
  todos.push(new TodoConstructor(inp.value));
  updateStorage();
  showTask();
  inp.value = "";
});

function showTask() {
  dom.todosWrapper.innerHTML = "";
  if (todos.length) {
    todos.forEach((todo, index) => {
      dom.todosWrapper.innerHTML += createTodo(todo, index);
    });

    todoItem = document.querySelectorAll(".todo-item");
  }

  dom.countTask.innerHTML = todos.length
    ? `Активных задач: ${todos.length}`
    : "Нет активных задач";
}

// Функция темплэйт
function createTodo(todo, index) {
  return `
  <div class='todo-item ${todo.isDone ? "checked" : ""}'>
    <div class='description'>${todo.description}</div>
    <div class='buttons'>
      <input ${
        todo.isDone ? "checked" : "uncheked"
      } onclick="handleIsDoneTask(${index})" type='checkbox' class='btn-complete'/>
      <button onclick="deleteTask(${index})" class='btn-delete'>Удалить</button>
    </div>
  </div>
  `;
}

function handleIsDoneTask(index) {
  todos[index].isDone = !todos[index].isDone;
  if (todos[index].isDone) {
    todoItem[index].classList.add("checked");
  } else {
    todoItem[index].classList.remove("checked");
  }
  updateStorage();
}

// Удаление задачи
function deleteTask(index) {
  todos.splice(index, 1);
  updateStorage();
  showTask();
}

showTask();








