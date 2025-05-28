import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VeterinariosScreen = () => {
  const [veterinarios, setVeterinarios] = useState([]);
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.crmv}>CRMV: {item.crmv}</Text>
          <Text style={styles.especialidade}>Especialidade: {item.especialidade}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('VeterinarioDetalhes', { veterinario: item })}
        >
          <Icon name="eye" size={24} color="#00593b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {veterinarios.length === 0 ? (
        <Text style={styles.vazio}>Nenhum veterinário cadastrado.</Text>
      ) : (
        <FlatList
          data={veterinarios}
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

export default VeterinariosScreen;

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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderTopWidth: 2,
    borderTopColor:'rgb(80, 80, 80)',
    borderWidth: 2,
    borderColor: 'rgb(80, 80, 80)',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  crmv: {
    fontSize: 14,
    color: '#555',
  },
  especialidade: {
    fontSize: 14,
    color: '#555',
  },
});
