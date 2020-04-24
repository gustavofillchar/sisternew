import React from 'react';
import {ScrollView, TouchableOpacity, Text} from 'react-native';

export default function TestRoutes({navigation}) {
  return (
    <ScrollView>
      <Text style={{textAlign: 'center', marginTop: 20, color: '#f00'}}>
        Esta tela é temporária apenas para ter como acessar as outras telas.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{alignSelf: 'center', padding: 10, borderWidth: 1, margin: 15}}>
        <Text style={{fontSize: 18}}>Cadastro do Motorista</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('VehicleRegister')}
        style={{alignSelf: 'center', padding: 10, borderWidth: 1, margin: 15}}>
        <Text style={{fontSize: 18}}>Cadastro do Veículo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{alignSelf: 'center', padding: 10, borderWidth: 1, margin: 15}}>
        <Text style={{fontSize: 18}}>Resumo da Viagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
