import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '~/pages/Main';
import Register from '~/pages/Register';
import VehicleRegister from '~/pages/VehicleRegister';
import TestRoutes from '~/pages/TestRoutes';
import Login from '~/pages/Login';
import CheckAuth from './pages/CheckAuth';
import ReadCar from './pages/ReadCar';
import RecordNewRoute from './pages/RecordNewRoute';
import RouteResult from './pages/RouteResult';

const Routes = createAppContainer(
  createStackNavigator(
    {
      TestRoutes: {
        screen: TestRoutes,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTitle: 'Teste das Rotas [temp]',
          headerTintColor: '#fff',
        },
      },
      Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false,
        },
      },
      ReadCar: {
        screen: ReadCar,
        navigationOptions: {
          headerShown: false,
        },
      },
      Register: {
        screen: Register,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#C10C19',
          },
          headerTitle: 'Cadastro do Motorista',
          headerTintColor: '#fff',
        },
      },
      VehicleRegister: {
        screen: VehicleRegister,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#C10C19',
          },
          headerTitle: 'Cadastro do Veículo',
          headerTintColor: '#fff',
        },
      },
      Main: {
        screen: Main,
        navigationOptions: {
          headerShown: false,
        },
      },
      RouteResult: {
        screen: RouteResult,
        navigationOptions: {
          headerShown: false,
        },
      },
      RecordNewRoute: {
        screen: RecordNewRoute,
        navigationOptions: {
          headerShown: false,
        },
      },
      CheckAuth: {
        screen: CheckAuth,
        navigationOptions: {
          headerShown: false,
        },
      },
    },

    {
      initialRouteName: 'CheckAuth',
      defaultNavigationOptions: {
        headerBackTitle: 'Voltar',
        headerTruncatedBackTitle: 'Voltar',
      },
    },
  ),
);

export default Routes;
