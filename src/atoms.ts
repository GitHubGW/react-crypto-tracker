import { atom } from "recoil";

const localStorageDarkMode: string | null = localStorage.getItem("DarkMode");
const darkMode: boolean = localStorageDarkMode === null ? false : JSON.parse(localStorageDarkMode);

export const darkModeState = atom<boolean>({ key: "darkModeState", default: darkMode });
