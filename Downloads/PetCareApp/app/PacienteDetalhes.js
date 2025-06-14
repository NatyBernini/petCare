import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function PacienteDetalhes({ route }) {
  const navigation = useNavigation();
  const { paciente } = route.params;

  const [historicoConsultas, setHistoricoConsultas] = useState([]);
  const [consultasAgendadas, setConsultasAgendadas] = useState([]);

  const carregarConsultas = async () => {
    try {
      const consultasRealizadasJSON = await AsyncStorage.getItem('consultasRealizadas');
      const consultasAgendadasJSON = await AsyncStorage.getItem('consultas');

      const consultasRealizadas = consultasRealizadasJSON ? JSON.parse(consultasRealizadasJSON) : [];
      const consultasAgendadas = consultasAgendadasJSON ? JSON.parse(consultasAgendadasJSON) : [];

      // Função para filtrar consultas pelo paciente atual
      const filtrarPorPaciente = (consulta) => {
        if (!consulta.paciente) return false;
        if (typeof consulta.paciente === 'object' && consulta.paciente.nome) {
          return consulta.paciente.nome.trim().toLowerCase() === paciente.nome.trim().toLowerCase();
        }
        if (typeof consulta.paciente === 'string') {
          return consulta.paciente.trim().toLowerCase() === paciente.nome.trim().toLowerCase();
        }
        return false;
      };

      // Filtrar histórico por paciente
      const historicoFiltrado = consultasRealizadas.filter(filtrarPorPaciente);

      // Função para identificar se uma consulta agendada já foi realizada
      const consultaFoiRealizada = (consultaAgendada) => {
        return historicoFiltrado.some((consultaRealizada) => {
          const pacienteAgendado = typeof consultaAgendada.paciente === 'string' ? consultaAgendada.paciente : consultaAgendada.paciente?.nome || '';
          const pacienteRealizado = typeof consultaRealizada.paciente === 'string' ? consultaRealizada.paciente : consultaRealizada.paciente?.nome || '';

          return (
            consultaRealizada.data === consultaAgendada.data &&
            consultaRealizada.hora === consultaAgendada.hora &&
            pacienteRealizado.trim().toLowerCase() === pacienteAgendado.trim().toLowerCase()
          );
        });
      };

      // Filtrar agenda por paciente e excluir as consultas já realizadas
      const agendaFiltrada = consultasAgendadas
        .filter(filtrarPorPaciente)
        .filter(consulta => !consultaFoiRealizada(consulta));

      setHistoricoConsultas(historicoFiltrado);
      setConsultasAgendadas(agendaFiltrada);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, [paciente.nome])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
         {/* Botão Voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={18} color="#000" />
        <Text style={styles.textoBtnVoltar}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Detalhes do Paciente</Text>
   <View style={styles.cardDetalhes}>
  <Text style={styles.label}>
    <FontAwesome5 name="paw" /> Nome: <Text style={styles.valor}>{paciente.nome}</Text>
  </Text>
  <Text style={styles.label}>
    Raça: <Text style={styles.valor}>{paciente.raca}</Text>
  </Text>
  <Text style={styles.label}>
    Sexo: <Text style={styles.valor}>{paciente.sexo}</Text>
  </Text>
  <Text style={styles.label}>
    Idade: <Text style={styles.valor}>{paciente.idade}</Text>
  </Text>
  <Text style={styles.label}>
    Pelagem: <Text style={styles.valor}>{paciente.pelagem}</Text>
  </Text>
  <Text style={styles.label}>
    Tutor: <Text style={styles.valor}>{paciente.nomeTutor}</Text>
  </Text>
  <Text style={styles.label}>
    Endereço: <Text style={styles.valor}>{paciente.endereco}</Text>
  </Text>
</View>

      {/* Histórico de Consultas */}
      <Text style={[styles.titulo, { marginTop: 30 }]}>Histórico de Consultas</Text>
      {historicoConsultas.length === 0 ? (
        <Text style={styles.semConsulta}>Nenhuma consulta encontrada.</Text>
      ) : (
        historicoConsultas.map((consulta, index) => (
          <View key={`hist-${index}`} style={styles.cardConsulta}>
            <Text style={styles.cardText}>
              <FontAwesome5 name="calendar" /> Data: {consulta.data}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="clock" /> Hora: {consulta.hora}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="user-md" /> Veterinário: {typeof consulta.veterinario === 'string' ? consulta.veterinario : consulta.veterinario?.nome || ''}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="notes-medical" /> Sintomas: {consulta.sintomas}
            </Text>
            <TouchableOpacity
              style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('ConsultaDetalhes', { consulta })}
            >
              <FontAwesome5 name="search" size={16} color="#007AFF" />
              <Text style={{ color: '#007AFF', marginLeft: 5 }}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Consultas Agendadas */}
      <Text style={[styles.titulo, { marginTop: 30 }]}>Consultas Agendadas</Text>
      {consultasAgendadas.length === 0 ? (
        <Text style={styles.semConsulta}>Nenhuma consulta agendada.</Text>
      ) : (
        consultasAgendadas.map((consulta, index) => (
          <View key={`agenda-${index}`} style={styles.cardConsulta}>
            <Text style={styles.cardText}>
              <FontAwesome5 name="calendar" /> Data: {consulta.data}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="clock" /> Hora: {consulta.hora}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="user-md" /> Veterinário: {typeof consulta.veterinario === 'string' ? consulta.veterinario : consulta.veterinario?.nome || ''}
            </Text>
            <TouchableOpacity
              style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('ConsultaDetalhes', { consulta })}
            >
              <FontAwesome5 name="search" size={16} color="#007AFF" />
              <Text style={{ color: '#007AFF', marginLeft: 5 }}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#f9faff',
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#555',
  },
  valor: {
    fontWeight: 'normal',
    color: '#333',
  },
    btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBtnVoltar: {
    color: '#000',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  cardConsulta: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
      borderTopWidth: 2,
    borderTopColor:'rgb(80, 80, 80)',
    borderWidth: 2,
    borderColor: 'rgb(80, 80, 80)',
  },
  cardText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 5,
  },
  semConsulta: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  cardDetalhes: {
  backgroundColor: '#ffffff',
  padding: 20,
  borderRadius: 12,
  marginBottom: 30,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
    borderTopWidth: 2,
    borderTopColor:'rgb(80, 80, 80)',
    borderWidth: 2,
    borderColor: 'rgb(80, 80, 80)',
},
label: {
  fontSize: 15,
  marginBottom: 10,
  fontWeight: '600',
  color: '#777',
},
valor: {
  fontWeight: '600',
  color: '#333',
},

});
