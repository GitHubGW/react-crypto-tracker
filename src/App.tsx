import Router from "./Router";
import GlobalStyle from "./themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/theme";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
