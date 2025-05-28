import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroHomeScreen from './cadastroHome';
import CadastroPacienteScreen from './cadastroPaciente';
import CadastroConsultaScreen from './cadastroConsulta';
import CadastroVeterinarioScreen from './cadastroVeterinario';
import ConsultaScreen from './consultaScreen';

const Stack = createNativeStackNavigator();

export default function CadastroStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CadastroHome"
        component={CadastroHomeScreen}
      />
      <Stack.Screen
        name="CadastroPaciente"
        component={CadastroPacienteScreen}
      />
      <Stack.Screen
        name="CadastroConsulta"
        component={CadastroConsultaScreen}
      />
      <Stack.Screen
        name="CadastroVeterinario"
        component={CadastroVeterinarioScreen}
      />
      <Stack.Screen
        name="RealizarConsulta"
        component={ConsultaScreen}
      />
    </Stack.Navigator>
  );
}
