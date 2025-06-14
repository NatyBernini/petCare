import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListagemScreen from './ListagemScreen';
import PacienteDetalhes from './PacienteDetalhes';

import VeterinarioDetalhes from './VeterinarioDetalhes';
import VeterinariosScreen from './listagemVeterinario';

import ConsultaScreen from './consultaScreen';
import ConsultaDetalhesScreen from './ConsultaDetalhesScreen';

const Stack = createNativeStackNavigator();

export default function PacientesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,  // Remove o header em todas as telas
      }}
    >
      <Stack.Screen 
        name="ListagemPacientes" 
        component={ListagemScreen} 
      />
      <Stack.Screen 
        name="PacienteDetalhes" 
        component={PacienteDetalhes} 
      />
      <Stack.Screen
        name="ListagemVeterinarios"
        component={VeterinariosScreen}
      />
      <Stack.Screen
        name="VeterinarioDetalhes"
        component={VeterinarioDetalhes}
      />
      <Stack.Screen 
        name="Consulta"              
        component={ConsultaScreen} 
      />
      <Stack.Screen 
        name="ConsultaDetalhes" 
        component={ConsultaDetalhesScreen} 
      />
    </Stack.Navigator>
  );
}
