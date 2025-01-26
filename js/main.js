const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
if (tasks.length > 0) {
    tasks.map((task) => renderTask(task));
    toggleEmptyList();
}

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(newTask);
    
    taskInput.value = '';
    taskInput.focus();

    toggleEmptyList();
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return; 

    const parenNode = event.target.closest('li');
    const id = Number(parenNode.id)
    const index = tasks.findIndex((task) => task.id === id)
        
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));

    parenNode.remove()

    toggleEmptyList();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id)
    const task = tasks.find(task => task.id === id);

    task.done = !task.done
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

function toggleEmptyList() {
    emptyList.classList[tasksList.children.length > 1 ? "add" : "remove"]('none');
}
