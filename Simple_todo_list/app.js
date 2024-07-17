// app.js
document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  if (task.completed) {
    taskElement.classList.add('completed');
  }

  let dueDateHtml = task.dueDate ? `<p>Due Date: ${task.dueDate}</p>` : '';

  taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    ${dueDateHtml}
    <p>Priority: ${task.priority}</p>
    <div class="task-actions">
      <button onclick="toggleComplete('${task.id}')">${task.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="editTask('${task.id}')">Edit</button>
      <button onclick="deleteTask('${task.id}')">Delete</button>
    </div>
  `;
  return taskElement;
}


function addTask() {
  const taskTitle = document.getElementById('taskTitle').value.trim();
  const taskDescription = document.getElementById('taskDescription').value.trim();
  const taskDueDate = document.getElementById('taskDueDate').value;
  const taskPriority = document.getElementById('taskPriority').value;

  if (taskTitle === '') {
    alert('Please enter a task title.');
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    priority: taskPriority,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const taskList = document.getElementById('taskList');
  const taskElement = createTaskElement(newTask);
  taskList.appendChild(taskElement);

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskDueDate').value = '';
  document.getElementById('taskPriority').value = 'low';
}

function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  if (task.completed) {
    taskElement.classList.add('completed');
  }
  taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <p>Priority: ${task.priority}</p>
    <div class="task-actions">
      <button onclick="toggleComplete('${task.id}')">${task.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="editTask('${task.id}')">Edit</button>
      <button onclick="deleteTask('${task.id}')">Delete</button>
    </div>
  `;
  return taskElement;
}

function toggleComplete(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const editedTitle = prompt('Edit Task Title:', tasks[index].title);
    if (editedTitle !== null) {
      tasks[index].title = editedTitle;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  }
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

