import styled from "styled-components";

const Title = styled.span`
  text-align: center;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Loading = () => {
  return <Title>Loading...</Title>;
};

export default Loading;
