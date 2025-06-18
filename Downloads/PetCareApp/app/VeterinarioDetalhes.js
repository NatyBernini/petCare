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
      <FontAwesome5 name="arrow-left" size={20} color="#FF7D3B" />
      <Text style={styles.textoVoltar}>Voltar</Text>
    </TouchableOpacity>

    <Text style={styles.titulo}>Detalhes do Veterinário</Text>

    <View style={styles.cardDetalhes}>
      <Text style={styles.label}>
        <FontAwesome5 name="user-md" color="#FF7D3B" /> Nome: 
        <Text style={styles.valor}>{veterinario.nome}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="id-card" color="#FF7D3B" /> CRMV: 
        <Text style={styles.valor}>{veterinario.crmv}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="star" color="#FF7D3B" /> Especialidade: 
        <Text style={styles.valor}>{veterinario.especialidade}</Text>
      </Text>
    </View>

    {/* Histórico */}
    <Text style={[styles.titulo, { marginTop: 20 }]}>Histórico de Consultas</Text>

    {historicoConsultas.length === 0 ? (
      <Text style={styles.semConsulta}>Nenhuma consulta realizada encontrada.</Text>
    ) : (
      historicoConsultas.map((consulta, index) => (
        <View key={`hist-${index}`} style={styles.cardConsulta}>
          <Text style={styles.cardText}>
            <FontAwesome5 name="calendar" color="#FF7D3B" /> Data: {consulta.data}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="clock" color="#FF7D3B" /> Hora: {consulta.hora}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="paw" color="#FF7D3B" /> Paciente: {typeof consulta.paciente === 'string' ? consulta.paciente : consulta.paciente?.nome || ''}
          </Text>

          <TouchableOpacity
            style={styles.detalhesButton}
            onPress={() => navigation.navigate('ConsultaDetalhes', { consulta })}
          >
            <FontAwesome5 name="search" size={16} color="#FF7D3B" />
            <Text style={styles.detalhesButtonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))
    )}

    {/* Agenda */}
    <Text style={[styles.titulo, { marginTop: 20 }]}>Agenda de Consultas</Text>

    {agendaConsultas.length === 0 ? (
      <Text style={styles.semConsulta}>Nenhuma consulta agendada.</Text>
    ) : (
      agendaConsultas.map((consulta, index) => (
        <View key={`agenda-${index}`} style={styles.cardConsulta}>
          <Text style={styles.cardText}>
            <FontAwesome5 name="calendar" color="#FF7D3B" /> Data: {consulta.data}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="clock" color="#FF7D3B" /> Hora: {consulta.hora}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="paw" color="#FF7D3B" /> Paciente: {typeof consulta.paciente === 'string' ? consulta.paciente : consulta.paciente?.nome || ''}
          </Text>

          <TouchableOpacity
            style={styles.detalhesButton}
            onPress={() => navigation.navigate('ConsultaDetalhes', { consulta })}
          >
            <FontAwesome5 name="search" size={16} color="#FF7D3B" />
            <Text style={styles.detalhesButtonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))
    )}
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#FFF',
    paddingBottom: 120,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    padding: 10,
    alignSelf: 'flex-start',
  },
  textoVoltar: {
    color: '#FF7D3B',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    color: '#FF7D3B',
    borderLeftWidth: 4,
    borderLeftColor: '#FF7D3B',
    paddingLeft: 15,
  },
  cardDetalhes: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFE8DC',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#FF7D3B',
  },
  valor: {
    fontWeight: 'normal',
    color: '#555',
    marginLeft: 5,
  },
  cardConsulta: {
    backgroundColor: '#FFF',
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#FF7D3B',
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  semConsulta: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  detalhesButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFF4ED',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detalhesButtonText: {
    color: '#FF7D3B',
    marginLeft: 8,
    fontWeight: '600',
  },
});
