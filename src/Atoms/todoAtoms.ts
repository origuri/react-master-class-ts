import { atom, selector } from "recoil";

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

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      // 필터를 사용해서 카테고리에 맞는 배열만 남김.
      // 한 배열 안에 todo arr, done arr, doing arr가 담겨있는 2차원 배열
      toDos.filter((toDo) => toDo.category === Category.TO_DO), // 1
      toDos.filter((toDo) => toDo.category === Category.DONE), // 2
      toDos.filter((toDo) => toDo.category === Category.DOING), // 3
    ];
  },
});
