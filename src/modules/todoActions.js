import Crud from "./crud.js";

const addTodoIcon = document.querySelector(".icon-add-todo");
const addTodoInput = document.querySelector(".add-todo-input");
const todoListContainer = document.querySelector(".todo-list");
const clearAllBtn = document.querySelector(".clear-all-btn");

// To do actions
const todoActions = () => {
  //  ////////////////////////
  // ADDING TODO ACTION
  //  ////////////////////////
  window.addEventListener("keyup", (e) => {
    if (e.key !== "Enter") return;
    const inputValue = e.target.value;
    if (inputValue?.trim().length === 0) return;
    if (!e.target.classList.contains("add-todo-input")) return;

    const todoClass = new Crud();
    todoClass.addTodo(inputValue);

    // clear input
    e.target.value = "";
  });

  addTodoIcon.addEventListener("click", () => {
    const { value } = addTodoInput;
    if (!value) return;

    const todoClass = new Crud();
    todoClass.addTodo(value);

    // clear input
    addTodoInput.value = "";
  });

  //  ////////////////////////
  // UPDATING TODO ACTION
  //  ////////////////////////
  window.addEventListener("keyup", (e) => {
    if (e.key !== "Enter") return;
    const inputValue = e.target.value;

    if (!e.target.classList.contains("todo-description")) return;
    if (inputValue?.trim().length === 0) return;

    const { id } = e.target.dataset;
    const todoClass = new Crud();
    todoClass.updateTodo(id, inputValue);
  });

  // Todo item actions from Icons
  todoListContainer.addEventListener("click", (e) => {
    const clickedIcon = e.target.closest(".item-icon");

    if (!clickedIcon) return;

    if (clickedIcon.classList.contains("fa-ellipsis-vertical")) {
      clickedIcon.style.display = "none";

      const deleteIconToShow = clickedIcon
        .closest(".todo-action-icons")
        ?.querySelector(".fa-trash-can");

      const cancelIconToShow = clickedIcon
        .closest(".todo-action-icons")
        ?.querySelector(".fa-xmark");

      // Show delete and cancel icons
      deleteIconToShow.style.visibility = "visible";
      cancelIconToShow.style.visibility = "visible";

      cancelIconToShow.addEventListener("click", () => {
        deleteIconToShow.style.visibility = "hidden";
        cancelIconToShow.style.visibility = "hidden";
        clickedIcon.style.display = "inline-block";
      });
    }

    if (clickedIcon.classList.contains("fa-trash-can")) {
      // DELETING ITEM
      const { id } = clickedIcon.dataset;

      const todoClass = new Crud();
      todoClass.removeItem(id);

      // Remove item from ui
      clickedIcon.closest(".todo-item")?.remove();
    }
  });

  // Checkbox action

  todoListContainer.addEventListener("click", (e) => {
    const clickedCheckbox = e.target.closest(".todo-checkbox");
    if (!clickedCheckbox) return;

    const todoClass = new Crud();
    const checkedItemId = clickedCheckbox.dataset.id;
    if (clickedCheckbox.checked) {
      clickedCheckbox.closest(".todo-item").dataset.complete = true;
      todoClass.updateTodoStatus(checkedItemId, true);
    } else {
      clickedCheckbox.closest(".todo-item").dataset.complete = false;
      todoClass.updateTodoStatus(checkedItemId, false);
    }
  });

  // Clear all selected items
  clearAllBtn.addEventListener("click", () => {
    // Remove checked items from ui
    const listItems = new Crud().updateUI();
    if (listItems.length > 0) {
      listItems.forEach((node) => {
        if (node.dataset.complete.trim() === "true") {
          const todoClass = new Crud();
          node.remove();
          const { id } = node.dataset;
          todoClass.removeItem(id);
        }
      });
    }
  });
};

export default todoActions;
