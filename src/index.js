import "./style.css";
import todoActions from "./modules/todoActions.js";
import Crud from "./modules/crud.js";

todoActions();

const todoClass = new Crud();
todoClass.updateUI();
