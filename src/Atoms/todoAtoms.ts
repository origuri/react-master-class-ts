import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // 카테고리는 string 타입의 3가지만 들어올 수 있음.
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
