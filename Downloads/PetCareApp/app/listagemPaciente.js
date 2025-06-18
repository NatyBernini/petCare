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
import { FontAwesome5 } from '@expo/vector-icons';

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

  // Função para filtrar pacientes por nome, tutor ou raça
  const pacientesFiltrados = pacientes.filter(paciente => {
    const termoBusca = filtro.toLowerCase();
    return (
      paciente.nome.toLowerCase().includes(termoBusca) ||
      (paciente.tutor?.nome && paciente.tutor.nome.toLowerCase().includes(termoBusca)) ||
      (paciente.raca && paciente.raca.toLowerCase().includes(termoBusca))
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PacienteDetalhes', { paciente: item })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <View style={styles.detalhesContainer}>
              <Text style={styles.detalhe}>{item.raca} • {item.idade}</Text>
              {item.sexo && (
              <FontAwesome5 
                  name={item.sexo === 'Fêmea' ? 'venus' : 'mars'} 
                  size={14} 
                  color="#FF7D3B" 
                  style={styles.sexoIcon} 
                />
              )}
            </View>
            <Text style={styles.tutor}>
              <Icon name="user" size={12} color="#555" /> {item.tutor?.nome}
            </Text>
            {item.tutor?.endereco && (
              <Text style={styles.endereco}>
                <Icon name="map-pin" size={12} color="#555" /> {`${item.tutor.endereco.cidade}/${item.tutor.endereco.estado}`}
              </Text>
            )}
          </View>
          <Icon name="chevron-right" size={24} color='rgb(255, 145, 0)' />
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
          placeholder="Buscar por paciente, tutor ou raça..."
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
        <View style={styles.emptyContainer}>
          <Icon name="inbox" size={40} color="#ccc" />
          <Text style={styles.vazio}>
            {filtro ? 'Nenhum resultado encontrado' : 'Nenhum paciente cadastrado'}
          </Text>
          {!filtro && (
            <TouchableOpacity 
              style={styles.btnAdd}
              onPress={() => navigation.navigate('CadastroPaciente')}
            >
              <Icon name="plus" size={18} color="#fff" />
              <Text style={styles.btnAddText}>Cadastrar primeiro paciente</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
       <View style={styles.lista}>
          {pacientesFiltrados.map((item, index) => (
            <React.Fragment key={index}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>

      )}
    </View>
  );
};

export default PacientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 45,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF7D3B',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nome: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
    color: '#333',
  },
  detalhesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detalhe: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    fontFamily: 'Poppins-Regular',
  },
  sexoIcon: {
    marginLeft: 5,
  },
  tutor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  endereco: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#777',
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 145, 0)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  btnAddText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
});