import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Category, toDoState } from "../Atoms/todoAtoms";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ITodoForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITodoForm>();

  const onSubmit = (data: ITodoForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: data.toDo, category: Category.TO_DO, id: Date.now() },
      ...oldToDos,
    ]);
    //console.log(data);
  };

  return (
    <div>
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
    </div>
  );
}

export default CreateToDo;
