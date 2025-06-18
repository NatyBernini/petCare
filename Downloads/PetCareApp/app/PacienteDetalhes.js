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
      <FontAwesome5 name="arrow-left" size={18} color="#FF7D3B" />
      <Text style={styles.textoBtnVoltar}>Voltar</Text>
    </TouchableOpacity>

    <Text style={styles.titulo}>Detalhes do Paciente</Text>
    
    <View style={styles.cardDetalhes}>
      <Text style={styles.label}>
        <FontAwesome5 name="paw" color="#FF7D3B" /> Nome: <Text style={styles.valor}>{paciente.nome}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="dna" color="#FF7D3B" /> Raça: <Text style={styles.valor}>{paciente.raca}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="venus-mars" color="#FF7D3B" /> Sexo: <Text style={styles.valor}>{paciente.sexo}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="birthday-cake" color="#FF7D3B" /> Idade: <Text style={styles.valor}>{paciente.idade}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="paint-brush" color="#FF7D3B" /> Pelagem: <Text style={styles.valor}>{paciente.pelagem}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="user" color="#FF7D3B" /> Tutor: <Text style={styles.valor}>{paciente.nomeTutor}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="map-marker-alt" color="#FF7D3B" /> Endereço: <Text style={styles.valor}>{paciente.endereco}</Text>
      </Text>
    </View>

    {/* Histórico de Consultas */}
    <Text style={[styles.titulo, { marginTop: 10 }]}>Histórico de Consultas</Text>
    {historicoConsultas.length === 0 ? (
      <Text style={styles.semConsulta}>Nenhuma consulta encontrada.</Text>
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
            <FontAwesome5 name="user-md" color="#FF7D3B" /> Veterinário: {typeof consulta.veterinario === 'string' ? consulta.veterinario : consulta.veterinario?.nome || ''}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="notes-medical" color="#FF7D3B" /> Sintomas: {consulta.sintomas.substring(0, 50)}{consulta.sintomas.length > 50 ? '...' : ''}
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

    {/* Consultas Agendadas */}
    <Text style={[styles.titulo, { marginTop: 20 }]}>Consultas Agendadas</Text>
    {consultasAgendadas.length === 0 ? (
      <Text style={styles.semConsulta}>Nenhuma consulta agendada.</Text>
    ) : (
      consultasAgendadas.map((consulta, index) => (
        <View key={`agenda-${index}`} style={styles.cardConsulta}>
          <Text style={styles.cardText}>
            <FontAwesome5 name="calendar" color="#FF7D3B" /> Data: {consulta.data}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="clock" color="#FF7D3B" /> Hora: {consulta.hora}
          </Text>
          <Text style={styles.cardText}>
            <FontAwesome5 name="user-md" color="#FF7D3B" /> Veterinário: {typeof consulta.veterinario === 'string' ? consulta.veterinario : consulta.veterinario?.nome || ''}
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
    padding: 20,
    backgroundColor: '#FFF',
    paddingBottom: 120
  },
  btnVoltar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    alignSelf: 'flex-start',
  },
  textoBtnVoltar: {
    color: '#FF7D3B',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
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
  },
  semConsulta: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  detalhesButton: {
    marginTop: 10,
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
