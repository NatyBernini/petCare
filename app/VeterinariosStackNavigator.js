import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VeterinarioDetalhes from './VeterinarioDetalhes';
import VeterinariosScreen from './listagemVeterinario';
const Stack = createNativeStackNavigator();

export default function VeterinariosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListagemVeterinarios"
        component={VeterinariosScreen}
        options={{ title: 'Veterinários', headerBackVisible: false }}
      />
      <Stack.Screen
        name="VeterinarioDetalhes"
        component={VeterinarioDetalhes}
        options={{ title: 'Detalhes do Veterinário' }}
      />
    </Stack.Navigator>
  );
}
