import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // ícone de "play" ou "check"

export default function ListagemConsultasScreen() {
  const [consultas, setConsultas] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const consultasJSON = await AsyncStorage.getItem('consultas');
        const consultasRealizadasJSON = await AsyncStorage.getItem('consultasRealizadas');

        const consultasAgendadas = consultasJSON ? JSON.parse(consultasJSON) : [];
        const consultasRealizadas = consultasRealizadasJSON ? JSON.parse(consultasRealizadasJSON) : [];

        // Filtrar as consultas agendadas removendo as que já foram realizadas
        const consultasPendentes = consultasAgendadas.filter((consultaAgendada) => {
          // Verifica se existe alguma consulta realizada que "combine" com a consulta agendada
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.paciente}>Paciente: {item.paciente}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Horário: {item.hora}</Text>
      <Text>Veterinário: {item.veterinario}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Consulta', {
            paciente: item.paciente,
            data: item.data,
            veterinario: item.veterinario,
            hora: item.hora, // passando hora para consulta, se necessário
          })
        }
      >
        <View style={styles.botaoConteudo}>
          <Text style={styles.botaoTexto}> Realizar Consulta</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {consultas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma consulta agendada.</Text>
      ) : (
      <FlatList
          data={consultas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  lista: {
    paddingTop: 20,
  },
  card: {
    backgroundColor:'rgb(255, 243, 227)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginRight: 15,
  },
  paciente: {
    fontWeight: 'bold',
    marginBottom: 4,
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
    marginVertical: 10,
    alignSelf: 'center', // para centralizar horizontalmente
  },
  botaoConteudo: {
    flexDirection: 'row', // ícone e texto lado a lado
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff', // cor do texto (mesma do ícone)
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8, // espaço entre ícone e texto
  },
});
