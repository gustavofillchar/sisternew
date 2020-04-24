import styled from 'styled-components/native';

export const Separator = styled.View`
  height: 1px;
  background-color: #ddd;
  margin: 20px 20px 0 20px;
`;

export const Margin = styled.View`
  margin-top: ${props => (props.top ? props.top : 0)}px;
  margin-bottom: ${props => (props.bottom ? props.bottom : 0)}px;
  margin-left: ${props => (props.left ? props.left : 0)}px;
  margin-right: ${props => (props.right ? props.right : 0)}px;
  margin: ${props => (props.vertical ? props.vertical : 0)}px ${props => (props.horizontal ? props.horizontal : 0)}px
    ${props => (props.vertical ? props.vertical : 0)}px ${props => (props.horizontal ? props.horizontal : 0)}px;
`;
