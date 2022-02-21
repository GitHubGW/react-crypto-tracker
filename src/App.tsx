import Router from "./Router";
import GlobalStyle from "./themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient: QueryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={darkTheme}>
        <HelmetProvider>
          <GlobalStyle />
          <Router />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
