import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { atom, useRecoilState } from "recoil";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface ITodoForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // 카테고리는 string 타입의 3가지만 들어올 수 있음.
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITodoForm>();

  const onSubmit = (data: ITodoForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: data.toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
    //console.log(data);
  };
  console.log("todos-> ", toDos);

  return (
    <div>
      <Helmet>
        <title>ToDos</title>
      </Helmet>
      <h1>ToDos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("toDo", {
            required: "todo는 필수 입니다.",
            minLength: {
              value: 3,
              message: "3자 이상 입력 요망",
            },
          })}
          placeholder="write your to do"
          type="text"
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          color="warning"
          focused
        />
        {errors?.toDo?.message}
        {/* mui는 button 타입을 지정해야 함. */}
        <Button variant="contained" color="error" type="submit">
          add
        </Button>
      </form>
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

export default ToDoList;
