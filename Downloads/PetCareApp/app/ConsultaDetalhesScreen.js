import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ConsultaDetalhesScreen({ route }) {
  const { consulta } = route.params;

  // Ícones para cada seção
  const icons = {
    paciente: 'paw',
    veterinario: 'user-md',
    data: 'calendar',
    hora: 'clock',
    sintomas: 'notes-medical',
    diagnostico: 'diagnoses',
    tratamento: 'pills',
    observacoes: 'clipboard'
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes da Consulta</Text>

      <View style={styles.card}>
        {/* Paciente */}
        <View style={styles.fieldContainer}>
          <FontAwesome5 name={icons.paciente} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.value}>{consulta.paciente}</Text>
          </View>
        </View>

        {/* Veterinário */}
        <View style={styles.fieldContainer}>
          <FontAwesome5 name={icons.veterinario} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Veterinário</Text>
            <Text style={styles.value}>{consulta.veterinario}</Text>
          </View>
        </View>

        {/* Data e Hora */}
        <View style={styles.row}>
          <View style={[styles.fieldContainer, { flex: 1, marginRight: 10 }]}>
            <FontAwesome5 name={icons.data} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.value}>{consulta.data}</Text>
            </View>
          </View>
          
          <View style={[styles.fieldContainer, { flex: 1 }]}>
            <FontAwesome5 name={icons.hora} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Hora</Text>
              <Text style={styles.value}>{consulta.hora}</Text>
            </View>
          </View>
        </View>

        {/* Sintomas */}
        <View style={styles.fieldContainer}>
          <FontAwesome5 name={icons.sintomas} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Sintomas</Text>
            <Text style={styles.value}>{consulta.sintomas}</Text>
          </View>
        </View>

        {/* Diagnóstico */}
        <View style={styles.fieldContainer}>
          <FontAwesome5 name={icons.diagnostico} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Diagnóstico</Text>
            <Text style={styles.value}>{consulta.diagnostico}</Text>
          </View>
        </View>

        {/* Tratamento */}
        <View style={styles.fieldContainer}>
          <FontAwesome5 name={icons.tratamento} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Tratamento</Text>
            <Text style={styles.value}>{consulta.tratamento}</Text>
          </View>
        </View>

        {/* Observações (se existir) */}
        {consulta.observacoes && (
          <View style={styles.fieldContainer}>
            <FontAwesome5 name={icons.observacoes} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Observações</Text>
              <Text style={styles.value}>{consulta.observacoes}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#FFF',
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    color: '#FF7D3B',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFE8DC',
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFE8DC',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    fontSize: 18,
    color: '#FF7D3B',
    marginRight: 15,
    marginTop: 3,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#FF7D3B',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});