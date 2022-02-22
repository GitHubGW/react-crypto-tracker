import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-family: 'Coda', cursive;
    display: flex;
    justify-content: center;
    align-items: center;
    background:url("../../images/background-main.jpeg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
