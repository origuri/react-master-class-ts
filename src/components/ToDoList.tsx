import { Helmet } from "react-helmet";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useRecoilValue } from "recoil";
import { toDoSelector } from "../Atoms/todoAtoms";
import { List } from "@mui/material";

function ToDoList() {
  const [toDos, done, doing] = useRecoilValue(toDoSelector);
  return (
    <div>
      <Helmet>
        <title>ToDos</title>
      </Helmet>
      <CreateToDo />

      {toDos.length !== 0 ? (
        <>
          <h1>ToDos</h1>
          <hr />
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </List>
        </>
      ) : null}

      {doing.length !== 0 ? (
        <>
          <h1>Doing</h1>
          <hr />
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
            {doing.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </List>
        </>
      ) : null}

      {done.length !== 0 ? (
        <>
          <h1>Done</h1>
          <hr />
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
            {done.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </List>
        </>
      ) : null}
    </div>
  );
}

export default ToDoList;
