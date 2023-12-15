import { useRecoilValue } from "recoil";
import { toDoState } from "../Atoms/todoAtoms";
import { List, ListItem, ListItemText } from "@mui/material";

function ToDo() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      {toDos.length !== 0 ? (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
          {toDos.map((toDo) => (
            <ListItem alignItems="flex-start">
              <ListItemText primary={toDo.text} />
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
}

export default ToDo;
