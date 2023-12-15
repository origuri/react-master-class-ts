import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@mui/material";

interface ToDoForm {
  toDo: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string; // 내가 만드는 에러
  checkBox1: boolean;
  username: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ToDoForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onVaild = (data: ToDoForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "비번이 다름" }, { shouldFocus: true });
    }
    //setError("extraError", { message: "서버 다운" });
  };
  console.log(watch("checkBox1"));

  return (
    <div>
      <form onSubmit={handleSubmit(onVaild)}>
        <TextField
          {...register("toDo", {
            required: "필수 ",
            minLength: {
              value: 10,
              message: "최소 10자 ",
            },
          })}
          type="text"
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          color="warning"
          focused
        />
        {errors.toDo?.message}
        <TextField
          {...register("email", {
            required: "필수 ",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버만 가능",
            },
          })}
          type="email"
          id="outlined-basic"
          label="email"
          variant="outlined"
          color="warning"
          focused
        />
        {errors.email?.message}
        <TextField
          {...register("username", {
            required: "필수 ",
            validate: {
              noOri: async (
                value // async로 만들어서 서버에 확인 후 응답을 받을 수도 있음!
              ) => (value.includes("ori") ? "ori는 사용할 수 없다" : true),
              noGuri: (value) =>
                value.includes("guri") ? "guri는 사용할 수 없다" : true,
            },
          })}
          type="text"
          id="outlined-basic"
          label="username"
          variant="outlined"
          color="warning"
          focused
        />
        {errors.username?.message}
        <TextField
          {...register("password", {
            minLength: {
              value: 5,
              message: "5자 이상 ",
            },
          })}
          type="password"
          id="outlined-basic"
          label="password"
          variant="outlined"
          color="warning"
          focused
        />
        {errors.password?.message}
        <TextField
          {...register("password1")}
          type="password"
          id="outlined-basic"
          label="password1"
          variant="outlined"
          color="warning"
          focused
        />
        {errors.password1?.message}
        <Checkbox {...register("checkBox1")} />

        {/* mui는 button 타입을 지정해야 함. */}
        <Button variant="contained" color="error" type="submit">
          add
        </Button>
        {/* {errors.extraError?.message} */}
      </form>
    </div>
  );
}

/*
function TodoList() {
  const [todo, setTodo] = useState("");
  // mui를 사용하기 위해선 이 타입으로 지정해야 함.
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(todo);
  };
  const onClick = () => {
    console.log("클릭");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          value={todo}
          onChange={onChange}
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          color="warning"
          focused
        />
        {/* mui는 button 타입을 지정해야 함. }
        <Button variant="contained" color="error" type="submit">
          add
        </Button>
      </form>
    </div>
  );
} */

export default ToDoList;
