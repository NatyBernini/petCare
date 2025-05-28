import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroConsultaScreen() {
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [veterinarioSelecionado, setVeterinarioSelecionado] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dataPacientes = await AsyncStorage.getItem('pacientes');
        if (dataPacientes) setPacientes(JSON.parse(dataPacientes));

        const dataVeterinarios = await AsyncStorage.getItem('veterinarios');
        if (dataVeterinarios) setVeterinarios(JSON.parse(dataVeterinarios));
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      }
    };
    carregarDados();
  }, []);

  const salvarConsultas = async (listaAtualizada) => {
    await AsyncStorage.setItem('consultas', JSON.stringify(listaAtualizada));
  };

  const handleAgendar = async () => {
    if (!dataConsulta || !horaConsulta || !pacienteSelecionado || !veterinarioSelecionado) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novaConsulta = {
      paciente: pacienteSelecionado,
      veterinario: veterinarioSelecionado,
      data: dataConsulta,
      hora: horaConsulta,
    };

    try {
      const consultasSalvasJSON = await AsyncStorage.getItem('consultas');
      const consultasSalvas = consultasSalvasJSON ? JSON.parse(consultasSalvasJSON) : [];

      const listaAtualizada = [...consultasSalvas, novaConsulta];
      await salvarConsultas(listaAtualizada);

      Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
      setDataConsulta('');
      setHoraConsulta('');
      setPacienteSelecionado('');
      setVeterinarioSelecionado('');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a consulta');
    }
  };

  return (
      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    keyboardVerticalOffset={80} // ajuste conforme a altura do seu header, se tiver
  >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Agendar Consulta</Text>

      <Text style={styles.label}>Paciente:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={pacienteSelecionado}
          onValueChange={setPacienteSelecionado}
          style={styles.picker}
          dropdownIconColor="#007AFF"
        >
          <Picker.Item label="Selecione um paciente" value="" color="#999" />
          {pacientes.map((p, i) => (
            <Picker.Item key={i} label={p.nome} value={p.nome} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Veterinário:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={veterinarioSelecionado}
          onValueChange={setVeterinarioSelecionado}
          style={styles.picker}
          dropdownIconColor="#007AFF"
        >
          <Picker.Item label="Selecione um veterinário" value="" color="#999" />
          {veterinarios.map((v, i) => (
            <Picker.Item key={i} label={v.nome} value={v.nome} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputWrapper}>
        <FontAwesome5 name="calendar-alt" size={20} color="#007AFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Data da Consulta (ex: 2025-05-27)"
          value={dataConsulta}
          onChangeText={setDataConsulta}
          placeholderTextColor="#999"
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <View style={styles.inputWrapper}>
        <FontAwesome5 name="clock" size={20} color="#007AFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Hora da Consulta (ex: 14:30)"
          value={horaConsulta}
          onChangeText={setHoraConsulta}
          placeholderTextColor="#999"
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={handleAgendar} activeOpacity={0.8}>
        <Text style={styles.btnText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    paddingBottom: 100,
    backgroundColor: '#f9faff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '700',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#555',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  btnPrimary: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
