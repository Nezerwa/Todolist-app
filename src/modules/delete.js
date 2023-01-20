/* eslint-disable import/no-mutable-exports */

export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export default function deleteTask() {
  const deleteBtn = document.querySelectorAll('.option');
  deleteBtn.forEach((btn) => {
    const container = document.querySelector('.container');
    btn.addEventListener('click', (e) => {
      const item = e.target.parentNode.parentNode;
      container.removeChild(item);
      const deletedTask = e.target.previousElementSibling.textContent;
      tasks = tasks.filter((task) => task.description !== deletedTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}

export function clearfield() {
  const input = document.querySelector('.task-to-add');
  input.value = '';
}

/* Interactiveness with the page. user can check the box on the task he/she just complete */

export function checkTasks() {
  const box = document.querySelectorAll('.checkbox');
  box.forEach((box) => {
    box.addEventListener('change', (e) => {
      const taskchecked = e.target.nextElementSibling;
      if (box.checked) {
        taskchecked.style.textDecoration = 'line-through';
        taskchecked.style.color = 'gray';
        for (let i = 0; i < tasks.length; i += 1) {
          if (tasks[i].description === taskchecked.textContent) {
            tasks[i].completed = true;

            localStorage.setItem('tasks', JSON.stringify(tasks));
          }
        }
      } else {
        taskchecked.style.color = 'black';
        taskchecked.style.textDecoration = 'none';
        for (let i = 0; i < tasks.length; i += 1) {
          if (tasks[i].description === taskchecked.textContent) {
            tasks[i].completed = false;
            localStorage.setItem('tasks', JSON.stringify(tasks));
          }
        }
      }
    });
  });
}

checkTasks();

/* User can Delete the checked task */

export function clearAll() {
  const clear = document.querySelector('.clear');
  clear.addEventListener('click', () => {
    tasks = tasks.filter((task) => task.completed !== true);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload(true);
  });
}

clearAll();