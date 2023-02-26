import styled from "styled-components";

const Loading = () => {
  return <Text>Loading...</Text>;
};

export default Loading;

const Text = styled.span`
  text-align: center;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;
