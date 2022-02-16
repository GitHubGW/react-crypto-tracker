import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

  body{
    font-family: 'Source Sans Pro', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height:100vh;
    background:url("images/background-main.jpeg") no-repeat center center;
    background-size: cover;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
