import styled from 'styled-components/native';

export const TagItem = styled.TouchableOpacity`
  width: ${props => (props.largeStyle ? '100%' : '33.333%')};
  padding: ${props => (props.largeStyle ? '15px' : '5px')};
`;

export const TagItemImage = styled.Image`
  height: ${props => (props.largeStyle ? '40px' : '43px')};
  width: ${props => (props.largeStyle ? '40px' : '43px')};
  margin-bottom: ${props => (props.largeStyle ? '0px' : '11px')};
`;

export const TagItemText = styled.Text`
  text-align: center;
  color: #999;
  margin-left: ${props => (props.largeStyle ? '15px' : '0px')};
  font-size: ${props => (props.largeStyle ? '16px' : '11px')};
  font-weight: ${props => (props.largeStyle ? 'normal' : '700')};
  padding: 0px;
`;

export const TagBoxer = styled.View`
  flex-direction: ${props => (props.largeStyle ? 'row' : 'column')};
  align-items: center;
  background-color: #fff;
  height: ${props => (props.largeStyle ? 'auto' : '105px')};
  justify-content: ${props => (props.largeStyle ? 'flex-start' : 'center')};
  padding: 5px;
  border: ${props => (props.largeStyle ? '0px' : 'solid 1px')};
  border-color: #eeeeee;
  border-radius: 3;
`;

export const Tabs = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 5px 0 5px;
`;

export const TagTitleView = styled.View`
  align-items: center;
`;

export const TagTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #888;
`;
