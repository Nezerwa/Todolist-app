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
      tasks.forEach((task, i) => {
        task.index = i;
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}

export function clearfield() {
  const input = document.querySelector('.task-to-add');
  input.value = '';
}