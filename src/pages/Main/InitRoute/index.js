import React, {useState, useEffect, useCallback} from 'react';
import {Container, FloatActionButton, Actions} from './styles';
import {getRoutesFromStorage} from '~/storage/routes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutesList from './RoutesList';

export default function InitRoute({route, onInitRoute, onRouteSelect, onStartRoute}) {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    async function preparePreviousRoutes() {
      const previousRoutes = await getRoutesFromStorage();
      setRoutes(previousRoutes);
    }
    preparePreviousRoutes();
  }, []);

  const handleRoutePress = useCallback(
    routeSelected => {
      onRouteSelect(routeSelected);
    },
    [onRouteSelect],
  );

  return (
    <Container>
      <RoutesList routes={routes} onRoutePress={handleRoutePress} />
      <Actions>
        <FloatActionButton onPress={onInitRoute} color="#3f51b5">
          <Icon name="plus" size={25} color="#fff" />
        </FloatActionButton>
        {route?.initialTime && route?.finalTime && (
          <FloatActionButton onPress={onStartRoute} color="#C10C19">
            <Icon name="play" size={25} color="#fff" />
          </FloatActionButton>
        )}
      </Actions>
    </Container>
  );
}
