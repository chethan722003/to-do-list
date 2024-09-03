document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('tasks');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Add task
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTask = {
            id: Date.now(),
            title: taskForm.title.value,
            description: taskForm.description.value,
            category: taskForm.category.value,
            priority: taskForm.priority.value,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
    });

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task', 'list-group-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <div>
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                    <small>Category: ${task.category} | Priority: ${task.priority}</small>
                </div>
                <div class="task-buttons">
                    <button class="btn btn-success btn-sm complete-btn">Complete</button>
                    <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
            `;
            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                taskForm.title.value = task.title;
                taskForm.description.value = task.description;
                taskForm.category.value = task.category;
                taskForm.priority.value = task.priority;
                tasks = tasks.filter(t => t.id !== task.id);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            taskList.appendChild(taskItem);
        });
    }

    renderTasks();
});
