import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  TouchableOpacity,
  TextInput 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function ListagemConsultasScreen() {
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const consultasJSON = await AsyncStorage.getItem('consultas');
        const consultasRealizadasJSON = await AsyncStorage.getItem('consultasRealizadas');

        const consultasAgendadas = consultasJSON ? JSON.parse(consultasJSON) : [];
        const consultasRealizadas = consultasRealizadasJSON ? JSON.parse(consultasRealizadasJSON) : [];

        const consultasPendentes = consultasAgendadas.filter((consultaAgendada) => {
          return !consultasRealizadas.some((consultaRealizada) => 
            consultaRealizada.paciente === consultaAgendada.paciente &&
            consultaRealizada.veterinario === consultaAgendada.veterinario &&
            consultaRealizada.data === consultaAgendada.data &&
            consultaRealizada.hora === consultaAgendada.hora
          );
        });

        setConsultas(consultasPendentes);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as consultas');
      }
    };

    if (isFocused) {
      carregarConsultas();
    }
  }, [isFocused]);

  // Função de filtro avançado
  const filtrarConsultas = () => {
  if (!filtro) return consultas;
  
  const termo = filtro.toLowerCase();
  return consultas.filter(consulta => {
    // Converte a data do banco (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
    const dataFormatada = formatarData(consulta.data);
    
    return (
      consulta.paciente.toLowerCase().includes(termo) ||
      consulta.veterinario.toLowerCase().includes(termo) ||
      consulta.data.includes(termo) || // Busca no formato original (YYYY-MM-DD)
      dataFormatada.includes(termo) || // Busca no formato brasileiro (DD/MM/YYYY)
      consulta.hora.includes(termo)
    );
  });
};
  const renderItem = ({ item }) => (
    <View style={styles.card}>
     <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.paciente}</Text>
        <FontAwesome name="paw" size={16} color="#FF7D3B" />
      </View>
      
      <View style={styles.infoRow}>
        <Feather name="calendar" size={16} color="#555" />
        <Text style={styles.infoText}>Data: {formatarData(item.data)}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Feather name="clock" size={16} color="#555" />
        <Text style={styles.infoText}>Horário: {item.hora}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Feather name="user" size={16} color="#555" />
        <Text style={styles.infoText}>Veterinário: {item.veterinario}</Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Consulta', {
            paciente: item.paciente,
            data: item.data,
            veterinario: item.veterinario,
            hora: item.hora,
          })
        }
      >
        <View style={styles.botaoConteudo}>
          <FontAwesome name="stethoscope" size={18} color="#fff" />
          <Text style={styles.botaoTexto}> Realizar Consulta</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Função para formatar data (dd/mm/aaaa)
  const formatarData = (data) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <View style={styles.container}>
      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Paciente, data, horário ou veterinário..."
          placeholderTextColor="#999"
          value={filtro}
          onChangeText={setFiltro}
        />
        <Feather 
          name="search" 
          size={20} 
          color="#999" 
          style={styles.searchIcon} 
        />
        {filtro ? (
          <TouchableOpacity 
            onPress={() => setFiltro('')}
            style={styles.clearIcon}
          >
            <Feather name="x" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Lista de consultas */}
      {filtrarConsultas().length === 0 ? (
        <Text style={styles.vazio}>
          {filtro ? 'Nenhuma consulta encontrada' : 'Nenhuma consulta agendada'}
        </Text>
      ) : (
        <FlatList
          data={filtrarConsultas()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          horizontal={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
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
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  lista: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: 'rgb(255, 243, 227)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12
  },  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  paciente: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  botao: {
    backgroundColor: 'rgb(255, 145, 0)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  botaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});