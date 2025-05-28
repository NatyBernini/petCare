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
      icon: <MaterialIcons name="pets" size={24} color="#00593b" />,
      content: <PacientesScreen pacientes={pacientes} />,
    },
    {
      key: 'consultas',
      title: 'Agenda de Consultas',
      icon: <FontAwesome5 name="calendar-check" size={24} color="#00593b" />,
      content: <ListagemConsultas consultas={consultas} />,
    },
    {
      key: 'veterinarios',
      title: 'Veterinários Cadastrados',
      icon: <Entypo name="user" size={24} color="#00593b" />,
      content: <VeterinariosScreen />,
    },
  ];

const renderSection = ({ item }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      {item.icon}
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
            <FontAwesome5 name="paw" size={36} color="#00593b" />
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
    backgroundColor: 'rgb(254, 210, 108)',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgb(79, 79, 79)',
    padding: 10,

    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,

    // Remove sombra nativa Android para usar sombra fake
    elevation: Platform.OS === 'ios' ? 15 : 0,
  },
fakeShadow: {
  top: 6,       // desloca sombra pra baixo
  left: 6,      // desloca sombra pra direita
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'black',
  borderRadius: 16,
  right: -5,
  bottom: -5,
  zIndex: -1,
},


});
