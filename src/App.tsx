import Router from "./Router";
import GlobalStyle from "./themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
