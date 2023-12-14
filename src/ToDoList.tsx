import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";

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
        <input value={todo} onChange={onChange} />
        <button>add</button>
        <TextField
          value={todo}
          onChange={onChange}
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          color="warning"
          focused
        />
        <Button variant="contained" color="error" type="submit">
          add
        </Button>
      </form>
    </div>
  );
}

export default TodoList;
