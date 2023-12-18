import { Helmet } from "react-helmet";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useRecoilValue } from "recoil";
import { toDoState } from "../Atoms/todoAtoms";
import { List } from "@mui/material";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
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
