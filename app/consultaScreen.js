import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function ConsultaScreen() {
  const route = useRoute();
  const { paciente: pacienteNavegado, data: dataNavegada, veterinario: veterinarioNavegado, hora: horaNavegada } = route.params || {};

  const [paciente, setPaciente] = useState(pacienteNavegado || '');
  const [veterinario, setVeterinario] = useState(veterinarioNavegado || '');
  const [data, setData] = useState(dataNavegada || '');
  const [hora, setHora] = useState(horaNavegada || '');

  const [pacientes, setPacientes] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [todasConsultasAgendadas, setTodasConsultasAgendadas] = useState([]);
  const [datasFiltradas, setDatasFiltradas] = useState([]);

  const [sintomas, setSintomas] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamento, setTratamento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const navigation = useNavigation();

  const bloquearPaciente = Boolean(pacienteNavegado);
  const bloquearVeterinario = Boolean(veterinarioNavegado);
  const bloquearData = Boolean(dataNavegada);
  const bloquearHora = Boolean(horaNavegada);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const pacientesData = await AsyncStorage.getItem('pacientes');
        const veterinariosData = await AsyncStorage.getItem('veterinarios');
        const consultasData = await AsyncStorage.getItem('consultas');

        if (pacientesData) setPacientes(JSON.parse(pacientesData));
        if (veterinariosData) setVeterinarios(JSON.parse(veterinariosData));
        if (consultasData) setTodasConsultasAgendadas(JSON.parse(consultasData));
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar dados do AsyncStorage');
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    filtrarDatas();
  }, [paciente, veterinario, todasConsultasAgendadas]);

  const filtrarDatas = () => {
    let filtradas = todasConsultasAgendadas;

    if (paciente && veterinario) {
      filtradas = filtradas.filter(c => c.paciente === paciente && c.veterinario === veterinario);
    } else if (paciente) {
      filtradas = filtradas.filter(c => c.paciente === paciente);
    } else if (veterinario) {
      filtradas = filtradas.filter(c => c.veterinario === veterinario);
    }

    const datasUnicas = [...new Set(filtradas.map(c => c.data))];
    setDatasFiltradas(datasUnicas);
  };

  const handleSalvarConsulta = async () => {
    if (!paciente || !veterinario || !data || !hora || !sintomas || !diagnostico || !tratamento) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const novaConsultaRealizada = {
      paciente,
      veterinario,
      data,
      hora,
      sintomas,
      diagnostico,
      tratamento,
      observacoes,
    };

    try {
      const consultasRealizadasJSON = await AsyncStorage.getItem('consultasRealizadas');
      const consultasRealizadas = consultasRealizadasJSON ? JSON.parse(consultasRealizadasJSON) : [];

      const listaAtualizada = [...consultasRealizadas, novaConsultaRealizada];
      await AsyncStorage.setItem('consultasRealizadas', JSON.stringify(listaAtualizada));

      Alert.alert('Sucesso', 'Consulta registrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar a consulta realizada');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Realizar Consulta</Text>

      <Text style={styles.label}>Paciente:</Text>
      <View style={[styles.pickerWrapper, bloquearPaciente && styles.desabilitado]}>
        <Picker
          selectedValue={paciente}
          onValueChange={setPaciente}
          enabled={!bloquearPaciente}
          style={[styles.picker, bloquearPaciente && styles.pickerDesabilitado]}
        >
          <Picker.Item label="Selecione um paciente" value="" />
          {pacientes.map((p, i) => (
            <Picker.Item key={i} label={p.nome} value={p.nome} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Veterinário:</Text>
      <View style={[styles.pickerWrapper, bloquearVeterinario && styles.desabilitado]}>
        <Picker
          selectedValue={veterinario}
          onValueChange={setVeterinario}
          enabled={!bloquearVeterinario}
          style={[styles.picker, bloquearVeterinario && styles.pickerDesabilitado]}
        >
          <Picker.Item label="Selecione um veterinário" value="" />
          {veterinarios.map((v, i) => (
            <Picker.Item key={i} label={v.nome} value={v.nome} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Data da consulta:</Text>
      <View style={[styles.pickerWrapper, bloquearData && styles.desabilitado]}>
        <Picker
          selectedValue={data}
          onValueChange={setData}
          enabled={!bloquearData}
          style={[styles.picker, bloquearData && styles.pickerDesabilitado]}
        >
          <Picker.Item label="Selecione uma data" value="" />
          {datasFiltradas.map((d, i) => (
            <Picker.Item key={i} label={d} value={d} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Hora da consulta (HH:mm):</Text>
      <TextInput
        style={[styles.input, bloquearHora && styles.desabilitado]}
        placeholder="Ex: 14:30"
        value={hora}
        onChangeText={setHora}
        keyboardType="numeric"
        editable={!bloquearHora}
        placeholderTextColor={bloquearHora ? '#888' : '#999'}
      />

      <TextInput
        style={styles.input}
        placeholder="Sintomas"
        value={sintomas}
        onChangeText={setSintomas}
      />
      <TextInput
        style={styles.input}
        placeholder="Diagnóstico"
        value={diagnostico}
        onChangeText={setDiagnostico}
      />
      <TextInput
        style={styles.input}
        placeholder="Tratamento"
        value={tratamento}
        onChangeText={setTratamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Observações (opcional)"
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvarConsulta}>
        <Text style={styles.botaoTexto}>Salvar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 120,
    backgroundColor: '#f9faff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  pickerDesabilitado: {
    color: '#888',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  desabilitado: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
