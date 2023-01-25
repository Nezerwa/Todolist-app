/* eslint-disable import/no-mutable-exports */

export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export default function deleteTask() {
  const deleteBtn = document.querySelectorAll('.option');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const deletedTaskIndex = e.target.dataset.index;
      const item = e.target.parentNode.parentNode;
      item.remove();
      tasks.splice(deletedTaskIndex, 1);

      // update index of remaining tasks
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
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
      const taskIndex = e.target.parentNode.dataset.index;
      tasks[taskIndex].completed = box.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}

checkTasks();

/* User can Delete the checked task */

export function clearAll() {
  const clear = document.querySelector('.clear');
  clear.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    clearfield();
  });
}

clearAll();
