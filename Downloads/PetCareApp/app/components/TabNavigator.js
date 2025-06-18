import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';  // <- Importa FontAwesome5

import PacientesStackNavigator from '../PacientesStackNavigator';
import CadastroStackNavigator from '../CadastroStackNavigator';
import PerfilScreen from '../perfilUsuario';
import VeterinariosStackNavigator from '../VeterinariosStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Pacientes') {
            iconName = 'paw';           // FontAwesome5: lista
          } else if (route.name === 'Cadastrar') {
            iconName = 'user-plus';      // FontAwesome5: adicionar usuário
          } else if (route.name === 'Perfil') {
            iconName = 'user-circle';    // FontAwesome5: usuário círculo
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          backgroundColor: 'rgb(255, 145, 0)',
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 20,
          marginBottom: 50,
          margin: 20
        },
      })}
    >
      <Tab.Screen
        name="Cadastrar"
        component={CadastroStackNavigator}
      />
      <Tab.Screen
        name="Pacientes"
        component={PacientesStackNavigator}
      />
    
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

