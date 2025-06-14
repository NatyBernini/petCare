import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListagemConsultas from './listagemConsultas';
import PacientesScreen from './listagemPaciente';
import VeterinariosScreen from './listagemVeterinario';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';


export default function ListagemScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const dataPacientes = await AsyncStorage.getItem('pacientes');
          if (dataPacientes) setPacientes(JSON.parse(dataPacientes));

          const dataConsultas = await AsyncStorage.getItem('consultas');
          if (dataConsultas) setConsultas(JSON.parse(dataConsultas));
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      };
      carregarDados();
    }, [])
  );

  // Lista de seções (títulos e componentes)
  const sections = [
    {
      key: 'animais',
      title: 'Animais Cadastrados',
      content: <PacientesScreen pacientes={pacientes} />,
    },
    {
      key: 'consultas',
      title: 'Agenda de Consultas',
      content: <ListagemConsultas consultas={consultas} />,
    },
    {
      key: 'veterinarios',
      title: 'Veterinários Cadastrados',
      content: <VeterinariosScreen />,
    },
  ];

const renderSection = ({ item }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
    </View>

    <View style={{ position: 'relative' }}>
      {Platform.OS === 'android' && <View style={styles.fakeShadow} />}
      <View style={styles.card}>
        {item.content}
      </View>
    </View>
  </View>
);



  return (
    <View
      style={styles.background}
    >
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={renderSection}
        contentContainerStyle={styles.innerContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>PetCare Dashboard</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 120,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#000',
    letterSpacing: 1,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginLeft: 8,
  },
// fakeShadow: {
//   top: 6,       // desloca sombra pra baixo
//   left: 6,      // desloca sombra pra direita
//   ...StyleSheet.absoluteFillObject,
//   backgroundColor: 'black',
//   borderRadius: 16,
//   right: -5,
//   bottom: -5,
//   zIndex: -1,
// },


});
