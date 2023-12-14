import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // 유일한 id
  default: false, // default value
});
