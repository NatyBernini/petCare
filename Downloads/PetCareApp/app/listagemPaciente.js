import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PacientesScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarPacientes = async () => {
      try {
        const data = await AsyncStorage.getItem('pacientes');
        if (data) {
          setPacientes(JSON.parse(data));
        } else {
          setPacientes([]);
        }
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
      }
    };

    if (isFocused) {
      carregarPacientes();
    }
  }, [isFocused]);

  // Função para filtrar pacientes por nome ou tutor
  const pacientesFiltrados = pacientes.filter(paciente => {
    const termoBusca = filtro.toLowerCase();
    return (
      paciente.nome.toLowerCase().includes(termoBusca) ||
      (paciente.nomeTutor && paciente.nomeTutor.toLowerCase().includes(termoBusca))
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PacienteDetalhes', { paciente: item })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.tutor}>Tutor: {item.nomeTutor}</Text>
          </View>
          <Icon name="eye" size={24} color='rgb(255, 145, 0)' />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por paciente ou tutor..."
          placeholderTextColor="#999"
          value={filtro}
          onChangeText={setFiltro}
        />
        <Icon 
          name="search" 
          size={20} 
          color="#999" 
          style={styles.searchIcon} 
        />
      </View>

      {/* Lista de pacientes */}
      {pacientesFiltrados.length === 0 ? (
        <Text style={styles.vazio}>
          {filtro ? 'Nenhum resultado encontrado' : 'Nenhum paciente cadastrado'}
        </Text>
      ) : (
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listaVertical}
        />
      )}
    </View>
  );
};

export default PacientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF7D3B',
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 12,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  listaVertical: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: 'rgb(255, 243, 227)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    width: '100%',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tutor: {
    fontSize: 14,
    color: '#555',
  },
});