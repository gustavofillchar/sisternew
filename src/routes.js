import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import Main from '~/pages/Main';
import Register from '~/pages/Register';
import GetCep from '~/pages/Register/GetCep';
import VehicleRegister from '~/pages/VehicleRegister';
import Login from '~/pages/Login';
import RecoveryPass from '~/pages/Login/recoveryPass';
import CheckAuth from './pages/CheckAuth';
import ReadCar from './pages/ReadCar';
import RecordNewRoute from './pages/RecordNewRoute';
import RouteResult from './pages/RouteResult';
import StudentID from './pages/StudentID';
import ScannerStudent from './pages/ScannerStudent';
import {getDateLoginFromStorage} from '~/storage/auth';
import {isSameDay} from 'date-fns';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

function Routes({navigation}) {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const [initRouteName, setInitlRouteName] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            console.log(state);
            setInitialState(state);
          } else {
            checkAuth();
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    const checkAuth = async () => {
      const dateLogin = await getDateLoginFromStorage();
      if (isSameDay(dateLogin, Date.now())) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady, navigation]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        console.log('state: ', state);
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}>
      <Stack.Navigator initialRouteName={initRouteName}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecoveryPass"
          component={RecoveryPass}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReadCar"
          component={ReadCar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GetCep"
          component={GetCep}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VehicleRegister"
          component={VehicleRegister}
          options={{
            headerStyle: {
              backgroundColor: '#C10C19',
            },
            headerTitle: 'Cadastro do Veículo',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RouteResult"
          component={RouteResult}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecordNewRoute"
          component={RecordNewRoute}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentID"
          component={StudentID}
          options={{
            headerStyle: {
              backgroundColor: '#C10C19',
            },
            headerTitle: 'Aluno',
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ScannerStudent"
          component={ScannerStudent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: '#C10C19',
            },
            headerTitle: 'Cadastro do Motorista',
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
