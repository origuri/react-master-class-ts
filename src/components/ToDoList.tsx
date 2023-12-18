import { Helmet } from "react-helmet";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { Category, categoryState, toDoSelector } from "../Atoms/todoAtoms";
import {
  FormControl,
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface ICategoryRadio {
  categoryRadio: Category;
}

function ToDoList() {
  const { register, watch } = useForm<ICategoryRadio>();
  // 배열을 반환하지 않기 때문에 객체로 변경
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  //useForm을 사용해서 라디오 버튼의 value 확인
  const chooseCategory = watch("categoryRadio");
  // set 해주면 selector에서 필터할 때 동적으로 사용함.
  setCategory(chooseCategory);

  console.log(category);

  return (
    <div>
      <Helmet>
        <title>ToDos</title>
      </Helmet>
      <CreateToDo />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={Category.TO_DO}
        >
          <FormControlLabel
            value={Category.TO_DO}
            control={<Radio />}
            label={Category.TO_DO}
            {...register("categoryRadio")}
          />
          <FormControlLabel
            value={Category.DOING}
            control={<Radio />}
            label={Category.DOING}
            {...register("categoryRadio")}
          />
          <FormControlLabel
            value={Category.DONE}
            control={<Radio />}
            label={Category.DONE}
            {...register("categoryRadio")}
          />
        </RadioGroup>
      </FormControl>

      {toDos.length !== 0 ? (
        <>
          <h1>{category}</h1>
          <hr />
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#ecf0f1" }}>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </List>
        </>
      ) : null}
    </div>
  );
}

export default ToDoList;
