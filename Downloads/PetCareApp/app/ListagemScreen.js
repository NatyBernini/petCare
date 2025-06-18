import React, { useState, useCallback } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListagemConsultas from './listagemConsultas';
import PacientesScreen from './listagemPaciente';
import VeterinariosScreen from './listagemVeterinario';
import { useFocusEffect } from '@react-navigation/native';

export default function ListagemScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('animais');

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

  const abas = [
    { key: 'animais', icon: '🐾', label: 'Animais' },
    { key: 'veterinarios', icon: '🩺', label: 'Veterinários' },
    { key: 'consultas', icon: '📅', label: 'Agenda' },
  ];

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'animais':
        return <PacientesScreen pacientes={pacientes} />;
      case 'veterinarios':
        return <VeterinariosScreen />;
      case 'consultas':
        return <ListagemConsultas consultas={consultas} />;
      default:
        return null;
    }
  };

  const renderAba = ({ item }) => {
    const ativo = item.key === abaAtiva;
    return (
      <TouchableOpacity
        style={styles.abaContainer}
        onPress={() => setAbaAtiva(item.key)}
      >
        <View style={[styles.abaIconeContainer, ativo && styles.abaIconeAtivo]}>
          <Text style={styles.abaIcone}>{item.icon}</Text>
        </View>
        <Text style={[styles.abaLabel, ativo && styles.abaLabelAtivo]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>PetCare Dashboard</Text>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Bem-vindo ao seu painel de controle! Gerencie seus pets e consultas com facilidade.
            </Text>
          </View>
        </View>

        {/* Tab Menu */}
        <View style={styles.tabMenuContainer}>
          <FlatList
            data={abas}
            keyExtractor={(item) => item.key}
            renderItem={renderAba}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabMenuContent}
          />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>
            {abaAtiva === 'animais' && 'Animais Cadastrados'}
            {abaAtiva === 'veterinarios' && 'Veterinários Cadastrados'}
            {abaAtiva === 'consultas' && 'Agenda de Consultas'}
          </Text>
          
          <View style={styles.contentCard}>
            {renderConteudo()}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15
  },
  banner: {
    backgroundColor: 'rgb(255, 145, 0)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  bannerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabMenuContainer: {
    height: 100,
    justifyContent: 'center',
    marginBottom: 5,
  },
  tabMenuContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  abaContainer: {
    alignItems: 'center',
    marginRight: 10,
    width: 70
  },
  abaIconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10
  },
  abaIconeAtivo: {
    backgroundColor: 'rgb(255, 145, 0)',
  },
  abaIcone: {
    fontSize: 24
  },
  abaLabel: {
    color: '#333',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  abaLabelAtivo: {
    color: '#FF7D3B',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  contentCard: {
    flex: 1,
    paddingBottom: 20,
  },
});