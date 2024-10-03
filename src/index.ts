import "./components/app-component"
import './components/user-todos-component'
import { loadAllToDos } from "./feature/todo-service";
import { loadAllUsers } from "./feature/user-service"

console.log("Hello World!");

loadAllUsers();
loadAllToDos();