import { atom } from "recoil";

const storedDarkMode = localStorage.getItem("DarkMode");
const isDarkMode = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;

export const darkModeState = atom<boolean>({
  key: "darkModeState",
  default: isDarkMode,
});
