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

const VeterinariosScreen = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarVeterinarios = async () => {
      try {
        const data = await AsyncStorage.getItem('veterinarios');
        if (data) {
          setVeterinarios(JSON.parse(data));
        } else {
          setVeterinarios([]);
        }
      } catch (error) {
        console.error('Erro ao carregar veterinários:', error);
      }
    };

    if (isFocused) {
      carregarVeterinarios();
    }
  }, [isFocused]);

  // Função para filtrar veterinários por nome, especialidade ou CRMV
  const veterinariosFiltrados = veterinarios.filter(vet => {
    const termoBusca = filtro.toLowerCase();
    return (
      vet.nome.toLowerCase().includes(termoBusca) ||
      (vet.especialidade && vet.especialidade.toLowerCase().includes(termoBusca)) ||
      (vet.crmv && vet.crmv.toLowerCase().includes(termoBusca))
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('VeterinarioDetalhes', { veterinario: item })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.crmv}>CRMV: {item.crmv}</Text>
            <Text style={styles.especialidade}>Especialidade: {item.especialidade}</Text>
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
          placeholder="Nome, especialidade ou CRMV..."
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

      {/* Lista de veterinários */}
      {veterinariosFiltrados.length === 0 ? (
        <Text style={styles.vazio}>
          {filtro ? 'Nenhum resultado encontrado' : 'Nenhum veterinário cadastrado'}
        </Text>
      ) : (
        <FlatList
          data={veterinariosFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listaVertical}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default VeterinariosScreen;

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
  crmv: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  especialidade: {
    fontSize: 14,
    color: '#555',
  },
});