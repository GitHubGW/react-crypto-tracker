import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { darkModeState } from "./atoms";

const App = () => {
  const darkMode = useRecoilValue(darkModeState);
  const setDarkMode = useSetRecoilState(darkModeState);
  const theme = darkMode ? darkTheme : lightTheme;
  const icon = darkMode ? "🌝" : "🌚";

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("DarkMode", JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <DarkModeButton onClick={handleToggleDarkMode}>{icon}</DarkModeButton>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;

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
