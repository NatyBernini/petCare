import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PacientesScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Recarrega a lista toda vez que a tela ficar ativa/focada
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
      {pacientes.length === 0 ? (
        <Text style={styles.vazio}>Nenhum paciente cadastrado.</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaHorizontal}
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
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  listaHorizontal: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'rgb(255, 243, 227)',
    padding: 20,
    borderRadius: 20,
    marginRight: 12,
    width: 250,
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
