import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Info = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  background-color: ${(props) => props.colorbg};
  padding: 7px 0;
`;
