import { useRecoilState } from "recoil";
import { Category, IToDo, toDoState } from "../Atoms/todoAtoms";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

function ToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos);

  /*  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    console.log(name);
  }; */

  const onClick = (nowCategory: IToDo["category"], id: number) => {
    console.log(nowCategory, id);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      console.log(targetIndex);

      return oldToDos;
    });
  };

  return (
    <div>
      {toDos.length !== 0 ? (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
          {toDos.map((toDo) => (
            <ListItem alignItems="flex-start" key={toDo.id}>
              <ListItemText primary={toDo.text} />
              {toDo.category !== Category.TO_DO && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => onClick(Category.TO_DO, toDo.id)}
                  name={Category.TO_DO}
                >
                  TODO
                </Button>
              )}
              {toDo.category !== Category.DOING && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => onClick(Category.DOING, toDo.id)}
                  name={Category.DOING}
                >
                  DOING
                </Button>
              )}
              {toDo.category !== Category.DONE && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onClick(Category.DONE, toDo.id)}
                  name={Category.DONE}
                >
                  DONE
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
}

export default ToDo;
