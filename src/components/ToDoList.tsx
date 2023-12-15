import { Helmet } from "react-helmet";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  return (
    <div>
      <Helmet>
        <title>ToDos</title>
      </Helmet>
      <h1>ToDos</h1>
      <hr />
      <CreateToDo />
      <ToDo />
    </div>
  );
}

export default ToDoList;
