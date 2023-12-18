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

  /* const onClick = (
    nowCategory: IToDo["category"],
    id: IToDo["id"],
    text: IToDo["text"]
  ) => {
    console.log(nowCategory, id, text);
    // prev => !prev랑 같은 형태
    setToDos((oldToDos) => {
      // 현재 todos에서 findIndex를 해서 해당 todo의 index번호를 가져옴
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      // 교체할 todo
      const newToDo = { text, category: nowCategory, id };

      // 새로 배열을 만들어준다.
      const newTodos = [...oldToDos];
      // splice : targetIndex부터 1 : 1개를 제거, newToDo : 제거한 자리에 교체
      newTodos.splice(targetIndex, 1, newToDo);

      return newTodos;
    });
  }; */

  const onClick = (
    nowCategory: IToDo["category"],
    id: IToDo["id"],
    text: IToDo["text"]
  ) => {
    console.log(nowCategory, id, text);
    // prev => !prev랑 같은 형태
    setToDos((oldToDos) => {
      // 현재 todos에서 findIndex를 해서 해당 todo의 index번호를 가져옴
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      // 교체할 todo
      const newToDo = { text, category: nowCategory, id };
      // 0부터 선택한 인덱스 전까지 자름
      const frontArr = oldToDos.slice(0, targetIndex);
      // 타겟 이후 부터 자름
      const backArr = oldToDos.slice(targetIndex + 1);
      // 배열을 합침
      const newTodos = [...frontArr, newToDo, ...backArr];

      return newTodos;
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
                  onClick={() => onClick(Category.TO_DO, toDo.id, toDo.text)}
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
                  onClick={() => onClick(Category.DOING, toDo.id, toDo.text)}
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
                  onClick={() => onClick(Category.DONE, toDo.id, toDo.text)}
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
