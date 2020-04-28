import React, {useRef} from 'react';
import {Container} from './styles';
import {Text} from 'react-native';

export default function StudentID({navigation}) {
  const {current: student} = useRef(navigation.getParam('student'));

  return (
    <Container>
      <Text>{student.name}</Text>
    </Container>
  );
}
