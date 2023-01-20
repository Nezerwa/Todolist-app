import { tasks } from './delete.js';

export default function checkTasks() {
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
            console.log(tasks);
          }
        }
      }

      taskchecked.style.color = 'black';
      taskchecked.style.textDecoration = 'none';
      for (let i = 0; i < tasks.length; i += 1) {
        if (tasks[i].description === taskchecked.textContent) {
          tasks[i].completed = false;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          console.log(tasks);
        }
      }
    });
  });
}

checkTasks();

function clearAll() {
  const clear = document.querySelector('.clear');
  clear.addEventListener('click', () => {
    tasks = tasks.filter((task) => task.completed !== true);
    console.log(tasks);
  });
}

clearAll();