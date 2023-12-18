import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

/* const { persistAtom: toDo } = recoilPersist({
  key: "ToDo",
  storage: localStorage,
});
const { persistAtom: category } = recoilPersist({
  key: "category1",
  storage: localStorage,
});
 */
export enum Category {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Category.TO_DO | Category.DOING | Category.DONE; // 카테고리는 string 타입의 3가지만 들어올 수 있음.
  isModify: boolean;
}

export const categoryState = atom({
  key: "category",
  default: Category.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  // 배열로 저장함.
  effects: [
    // setSelf : atom 값을 설정, storage에 있는 데이터를 atom에 넣어줌 넣어줄 때 사용
    // onSet : atom의 변화를 감지해 storage에 데이터 저장
    ({ setSelf, onSet }) => {
      const storageKey = "TODOS";
      // 키로 저장 된 아이템이 있다면 가져올 것
      const savedData = localStorage.getItem(storageKey);
      // 저장 된 데이터가 있다면 parsing해서 atom에 넣어주고 페이지에서 사용함.
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      // toDo : 새로운 데이터, _ : defaultValue, isReset : 클리어
      onSet((toDo, _, isReset) => {
        isReset
          ? localStorage.removeItem(storageKey)
          : localStorage.setItem(storageKey, JSON.stringify(toDo));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // 동적으로 filtering 해줌
    return toDos.filter((toDo) => toDo.category === category);
  },
});
