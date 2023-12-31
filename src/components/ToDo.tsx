import { useSetRecoilState } from "recoil";
import { Category, IToDo, toDoState } from "../Atoms/todoAtoms";
import { Button, ListItem, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import ModifyToDo from "./ModifyToDo";

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const [isModify, setModfiy] = useState(false);

  const onModify = useCallback(() => {
    setModfiy((prev) => !prev);
  }, [isModify]);

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

  const onClick = (nowCategory: IToDo["category"]) => {
    // prev => !prev랑 같은 형태
    setToDos((oldToDos) => {
      // 현재 todos에서 findIndex를 해서 해당 todo의 index번호를 가져옴
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      // 교체할 todo
      const newToDo = {
        text,
        category: nowCategory,
        id,
        isModify: false,
      };
      // 0부터 선택한 인덱스 전까지 자름
      const frontArr = oldToDos.slice(0, targetIndex);
      // 타겟 이후 부터 자름
      const backArr = oldToDos.slice(targetIndex + 1);
      // 배열을 합침
      const newTodos = [...frontArr, newToDo, ...backArr];

      return newTodos;
    });
  };

  /*  const onDelete = () => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      console.log("타겟 =>", targetIndex);

      const newToDos = [...oldTodos];
      newToDos.splice(targetIndex, 1);
      return newToDos;
    });
  }; */
  const onDelete = () => {
    setToDos((oldTodos) => {
      const newToDos = [...oldTodos];

      return newToDos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <ListItem alignItems="flex-start" key={id}>
      {isModify ? (
        <ModifyToDo
          onModify={onModify}
          text={text}
          id={id}
          category={category}
        />
      ) : (
        <>
          <ListItemText primary={text} onClick={onModify} />
          {category !== Category.DOING && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onClick(Category.DOING)}
              name={Category.DOING}
            >
              DOING
            </Button>
          )}
          {category !== Category.DONE && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onClick(Category.DONE)}
              name={Category.DONE}
            >
              DONE
            </Button>
          )}
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={onDelete}
            name="Delete"
          >
            Delete
          </Button>
        </>
      )}
    </ListItem>
  );
}

export default ToDo;
