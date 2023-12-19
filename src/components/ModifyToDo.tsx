import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { useSetRecoilState } from "recoil";
import { Category, toDoState } from "../Atoms/todoAtoms";
interface IModifyToDo {
  onModify: Function;
  text: string;
  id: number;
  category: Category;
}

interface IModifyForm {
  modifyToDo: string;
}

function ModifyToDo({ onModify, text, id, category }: IModifyToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IModifyForm>({ defaultValues: { modifyToDo: text } });

  // 수정하기 위해 타겟 인덱스를 찾고 splice로 교체할 예정
  const onModifySubmit = (data: IModifyForm) => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      // 불변성을 위한 배열 만들기
      const newTodos = [...oldTodos];
      const modifyToDo = { text: data.modifyToDo, category: category, id: id };
      newTodos.splice(targetIndex, 1, modifyToDo);

      return newTodos;
    });
    onModify();
  };

  const onModifyCancel = () => {
    onModify();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onModifySubmit)}>
        <TextField
          id="standard-basic"
          variant="standard"
          {...register("modifyToDo", {
            minLength: {
              value: 1,
              message: "1자 이상 써주세요 좋은 말 할때?",
            },
            required: "필수다",
          })}
        />
        {errors?.modifyToDo?.message}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          size="small"
          type="submit"
        >
          Send
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          size="small"
          color="error"
          onClick={onModifyCancel}
        >
          cancel
        </Button>
      </form>
    </div>
  );
}

export default ModifyToDo;
