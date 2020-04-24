import React, {useMemo} from 'react';
import {Container, Label, Footer, ItemFooter, LabelFooter} from './styles';
import {getTotalStudents} from '~/utils/route';
import {formatDistance} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import pt from 'date-fns/locale/pt';

export default function RouteItem({index, route, onPress}) {
  const totalStudents = useMemo(() => {
    return getTotalStudents(route);
  }, [route]);

  return (
    <Container onPress={onPress}>
      <Label>Rota {index}</Label>
      <Footer>
        <ItemFooter>
          <Icon name="account-multiple" size={15} color="#888" />
          <LabelFooter>{totalStudents} alunos</LabelFooter>
        </ItemFooter>
        <ItemFooter>
          <Icon name="map-marker-check" size={15} color="#888" />
          <LabelFooter>{route.stops.length} paradas</LabelFooter>
        </ItemFooter>
        <ItemFooter>
          <Icon name="timer" size={15} color="#888" />

          {route.initialTime && route.finalTime && (
            <LabelFooter>
              {formatDistance(route.finalTime, route.initialTime, {includeSeconds: true, locale: pt})}
            </LabelFooter>
          )}
        </ItemFooter>
      </Footer>
    </Container>
  );
}
