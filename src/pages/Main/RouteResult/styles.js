import styled from 'styled-components/native';

export const Info = styled.View`
  font-size: 22px;
  margin: 15px 15px 5px 15px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 200px;
  border: solid #ddd 2px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #999;
  font-weight: 700;
`;

export const BoxTripDetail = styled.View`
  margin: 15px 20px 0 20px;
  flex-direction: row;
  align-items: center;
`;

export const DescriptTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
  color: #555;
`;

export const InfoDescriptText = styled.Text`
  font-size: 18px;
`;

export const InfoBoxDescript = styled.View`
  margin: 10px 15px 0 15px;
  padding: 5px;
  border-radius: 100px;
  flex-direction: row;
  background-color: #eceff1;
  align-items: center;
  justify-content: center;
`;

export const CloseBox = styled.TouchableOpacity`
  background-color: #2196f3;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  border-radius: 150px;
`;

export const CloseTitle = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ContainerInfo = styled.ScrollView`
  flex: 1;
`;
