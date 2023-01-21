import deleteTask, {
  clearfield, tasks, checkTasks, clearAll,
} from './delete.js';

// import checkTasks from './interactive.js';

const container = document.querySelector('.container');
export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

/* ---------Populate tasks on the page -----------*/

export const populate = (task) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const li = document.createElement('p');
  li.classList.add('list-item');
  const horizontal = document.createElement('hr');
  li.appendChild(horizontal);

  const box = document.createElement('input');
  box.setAttribute('type', 'checkbox');
  box.classList.add('checkbox');
  box.setAttribute(`${task.completed ? 'checked' : 'ffff'}`, true);
  const title = document.createElement('span');
  title.classList.add('title');
  title.innerHTML = task.description;
  const option = document.createElement('i');
  option.classList.add('option');

  wrapper.appendChild(li);
  li.append(box, title, option);
  container.append(wrapper);
};

/* -----Add tasks to the UI--------- */
export function addTask() {
  const addBtn = document.querySelector('.add');
  addBtn.addEventListener('click', () => {
    const input = document.querySelector('.task-to-add').value;
    if (input === '') {
      return false;
    }
    const task = new Task(input, false, tasks.length + 1);
    populate(task);
    clearfield();
    tasks.push(task);
    deleteTask();
    checkTasks();
    clearAll();
    return localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}
addTask();
/* ----------------Get populate element from the localStorage ------- */

tasks.forEach((task) => {
  populate(task);
});

deleteTask();
checkTasks();