import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { darkModeState } from "./atoms";

const DarkModeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 60px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const App = () => {
  const darkMode: boolean = useRecoilValue(darkModeState);
  const setDarkMode: SetterOrUpdater<boolean> = useSetRecoilState(darkModeState);

  const handleToggleDarkMode = (): void => {
    setDarkMode((darkMode: boolean) => !darkMode);
    localStorage.setItem("DarkMode", JSON.stringify(!darkMode));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <DarkModeButton onClick={handleToggleDarkMode}>{darkMode ? "🌝" : "🌚"}</DarkModeButton>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
