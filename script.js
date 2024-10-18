
document.addEventListener('DOMContentLoaded', loadTasks);
function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.description, task.status);
        taskList.appendChild(taskItem);
    });
    if (tasks.length > 0) {
        taskList.classList.add('show');
    }
}
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        const taskItem = createTaskItem(taskDescription, 'Pending');
        taskList.appendChild(taskItem);
        taskList.classList.add('show');
        updateLocalStorage();
        taskInput.value = '';
    }
}
function createTaskItem(description, status) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${description} [${status}]</span>
        <div>
            <button onclick="toggleStatus(this)">${status === 'Pending' ? 'Done' : 'Not Done'}</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    return taskItem;
}
function toggleStatus(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('span');
    const currentStatus = taskText.textContent.includes('[Pending]') ? 'Pending' : 'Completed';
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    taskText.textContent = taskText.textContent.replace(currentStatus, newStatus);
    button.textContent = newStatus === 'Completed' ? 'Not Done' : 'Done';
    updateLocalStorage();
}
function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('span');
    const newDescription = prompt('Edit Task:', taskText.textContent.split(' [')[0]);
    if (newDescription !== null && newDescription.trim() !== '') {
        taskText.textContent = newDescription + ' [' + (taskText.textContent.includes('[Completed]') ? 'Completed' : 'Pending') + ']';
        updateLocalStorage();
    }
}
function deleteTask(button) {
    const taskList = document.getElementById('task-list');
    const taskItem = button.parentElement.parentElement;
    taskList.removeChild(taskItem);
    updateLocalStorage();
    if (taskList.children.length === 0) {
        taskList.classList.remove('show');
    }
}
function updateLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const description = taskText.split(' [')[0];
        const status = taskText.split(' [')[1].replace(']', '');
        tasks.push({ description, status });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTasks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const taskText = item.querySelector('span').textContent.toLowerCase();
        item.style.display = taskText.includes(searchInput) ? 'flex' : 'none';
    });
}
