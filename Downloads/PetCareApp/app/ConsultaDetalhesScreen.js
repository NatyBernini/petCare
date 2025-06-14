import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ConsultaDetalhesScreen({ route }) {
  const { consulta } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes da Consulta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>{consulta.paciente}</Text>

        <Text style={styles.label}>Veterinário:</Text>
        <Text style={styles.value}>{consulta.veterinario}</Text>

        <Text style={styles.label}>Data da Consulta:</Text>
        <Text style={styles.value}>{consulta.data}</Text>

        <Text style={styles.label}>Horário da Consulta:</Text>
        <Text style={styles.value}>{consulta.hora}</Text>

        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.value}>{consulta.sintomas}</Text>

        <Text style={styles.label}>Diagnóstico:</Text>
        <Text style={styles.value}>{consulta.diagnostico}</Text>

        <Text style={styles.label}>Tratamento:</Text>
        <Text style={styles.value}>{consulta.tratamento}</Text>

        {consulta.observacoes ? (
          <>
            <Text style={styles.label}>Observações:</Text>
            <Text style={styles.value}>{consulta.observacoes}</Text>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#222',
    marginTop: 2,
  },
});
