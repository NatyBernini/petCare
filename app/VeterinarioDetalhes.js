import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function VeterinarioDetalhes({ route }) {
  const { veterinario } = route.params;
  const navigation = useNavigation();

  const [historicoConsultas, setHistoricoConsultas] = useState([]);
  const [agendaConsultas, setAgendaConsultas] = useState([]);

  const carregarConsultas = async () => {
    try {
      const consultasRealizadasJSON = await AsyncStorage.getItem('consultasRealizadas');
      const consultasAgendadasJSON = await AsyncStorage.getItem('consultas');

      const consultasRealizadas = consultasRealizadasJSON ? JSON.parse(consultasRealizadasJSON) : [];
      const consultasAgendadas = consultasAgendadasJSON ? JSON.parse(consultasAgendadasJSON) : [];

      const filtrarPorVeterinario = (consulta) => {
        if (!consulta.veterinario) return false;
        if (typeof consulta.veterinario === 'object' && consulta.veterinario.nome) {
          return consulta.veterinario.nome.trim().toLowerCase() === veterinario.nome.trim().toLowerCase();
        }
        if (typeof consulta.veterinario === 'string') {
          return consulta.veterinario.trim().toLowerCase() === veterinario.nome.trim().toLowerCase();
        }
        return false;
      };

      const historicoFiltrado = consultasRealizadas.filter(filtrarPorVeterinario);

      const consultaFoiRealizada = (consultaAgendada) => {
        return historicoFiltrado.some((consultaRealizada) => {
          const pacienteAgendado = typeof consultaAgendada.paciente === 'string' ? consultaAgendada.paciente : consultaAgendada.paciente?.nome || '';
          const pacienteRealizado = typeof consultaRealizada.paciente === 'string' ? consultaRealizada.paciente : consultaRealizada.paciente?.nome || '';

          return (
            consultaRealizada.data === consultaAgendada.data &&
            consultaRealizada.hora === consultaAgendada.hora &&
            pacienteRealizado === pacienteAgendado
          );
        });
      };

      const agendaFiltrada = consultasAgendadas
        .filter(filtrarPorVeterinario)
        .filter(consulta => !consultaFoiRealizada(consulta));

      setHistoricoConsultas(historicoFiltrado);
      setAgendaConsultas(agendaFiltrada);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, [veterinario.nome])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
        <FontAwesome5 name="arrow-left" size={20} color="#333" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Detalhes do Veterinário</Text>

      <View style={styles.cardDetalhes}>
        <Text style={styles.label}>
          <FontAwesome5 name="user-md" /> Nome: <Text style={styles.valor}>{veterinario.nome}</Text>
        </Text>
        <Text style={styles.label}>
          CRMV: <Text style={styles.valor}>{veterinario.crmv}</Text>
        </Text>
        <Text style={styles.label}>
          Especialidade: <Text style={styles.valor}>{veterinario.especialidade}</Text>
        </Text>
      </View>

      {/* Histórico */}
      <Text style={[styles.titulo, { marginTop: 30 }]}>Histórico de Consultas</Text>

      {historicoConsultas.length === 0 ? (
        <Text style={styles.semConsulta}>Nenhuma consulta realizada encontrada.</Text>
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
              <FontAwesome5 name="paw" /> Paciente: {typeof consulta.paciente === 'string' ? consulta.paciente : consulta.paciente?.nome || ''}
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

      {/* Agenda */}
      <Text style={[styles.titulo, { marginTop: 30 }]}>Agenda de Consultas</Text>

      {agendaConsultas.length === 0 ? (
        <Text style={styles.semConsulta}>Nenhuma consulta agendada.</Text>
      ) : (
        agendaConsultas.map((consulta, index) => (
          <View key={`agenda-${index}`} style={styles.cardConsulta}>
            <Text style={styles.cardText}>
              <FontAwesome5 name="calendar" /> Data: {consulta.data}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="clock" /> Hora: {consulta.hora}
            </Text>
            <Text style={styles.cardText}>
              <FontAwesome5 name="paw" /> Paciente: {typeof consulta.paciente === 'string' ? consulta.paciente : consulta.paciente?.nome || ''}
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
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoVoltar: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
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
    borderTopColor: 'rgb(80, 80, 80)',
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
    borderTopColor: 'rgb(80, 80, 80)',
    borderWidth: 2,
    borderColor: 'rgb(80, 80, 80)',
  },
});
