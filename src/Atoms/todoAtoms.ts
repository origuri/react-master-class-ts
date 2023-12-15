import { atom } from "recoil";

export enum Category {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Category.TO_DO | Category.DOING | Category.DONE; // 카테고리는 string 타입의 3가지만 들어올 수 있음.
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
