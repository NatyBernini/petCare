import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function ConsultaScreen() {
  const route = useRoute();
  const { paciente: pacienteNavegado, data: dataNavegada, veterinario: veterinarioNavegado, hora: horaNavegada } = route.params || {};

  const [paciente, setPaciente] = useState(pacienteNavegado || '');
  const [veterinario, setVeterinario] = useState(veterinarioNavegado || '');
  const [data, setData] = useState(dataNavegada || '');
  // Substitua o estado atual da hora por:
const [hora, setHora] = useState(horaNavegada || '');

const formatarHora = (text) => {
  // Remove todos os caracteres que não são números
  let numericValue = text.replace(/[^0-9]/g, '');
  
  // Limita a 4 dígitos (HHMM)
  if (numericValue.length > 4) {
    numericValue = numericValue.substring(0, 4);
  }
  
  // Adiciona os ":" automaticamente após 2 dígitos
  if (numericValue.length > 2) {
    numericValue = numericValue.substring(0, 2) + ':' + numericValue.substring(2);
  }
  
  // Validação do formato 24 horas
  if (numericValue.length >= 2) {
    const horas = numericValue.substring(0, 2);
    let horasNum = parseInt(horas, 10);
    
    // Corrige horas inválidas (>23)
    if (horasNum > 23) {
      horasNum = 23;
      numericValue = horasNum.toString().padStart(2, '0') + (numericValue.length > 2 ? numericValue.substring(2) : '');
    }
  }
  
  if (numericValue.length > 3) {
    const minutos = numericValue.substring(3);
    let minutosNum = parseInt(minutos, 10);
    
    // Corrige minutos inválidos (>59)
    if (minutosNum > 59) {
      minutosNum = 59;
      numericValue = numericValue.substring(0, 3) + minutosNum.toString().padStart(2, '0');
    }
  }
  
  return numericValue;
};

const validarHoraCompleta = (hora) => {
  if (!hora || hora.length < 5) return false;
  
  const [horas, minutos] = hora.split(':').map(Number);
  return horas >= 0 && horas <= 23 && minutos >= 0 && minutos <= 59;
};

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
    Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  if (!validarHoraCompleta(hora)) {
    Alert.alert('Atenção', 'Por favor, insira uma hora válida no formato 24h (00:00 a 23:59)');
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
      Alert.alert('Erro', 'Não foi possível salvar a consulta');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registro de Consulta</Text>
          <Feather name="edit-3" size={24} color="#fff" />
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Seção Paciente */}
          <Text style={styles.sectionTitle}>Informações da Consulta</Text>
          
          <Text style={styles.label}>Paciente:</Text>
          <View style={[styles.pickerWrapper, bloquearPaciente && styles.desabilitado]}>
            <Picker
              selectedValue={paciente}
              onValueChange={setPaciente}
              enabled={!bloquearPaciente}
              dropdownIconColor="#FF7D3B"
            >
              <Picker.Item label="Selecione um paciente" value="" color="#999" />
              {pacientes.map((p, i) => (
                <Picker.Item key={i} label={p.nome} value={p.nome} />
              ))}
            </Picker>
          </View>

          {/* Seção Veterinário */}
          <Text style={styles.label}>Veterinário:</Text>
          <View style={[styles.pickerWrapper, bloquearVeterinario && styles.desabilitado]}>
            <Picker
              selectedValue={veterinario}
              onValueChange={setVeterinario}
              enabled={!bloquearVeterinario}
              dropdownIconColor="#FF7D3B"
            >
              <Picker.Item label="Selecione um veterinário" value="" color="#999" />
              {veterinarios.map((v, i) => (
                <Picker.Item key={i} label={v.nome} value={v.nome} />
              ))}
            </Picker>
          </View>

          {/* Seção Data/Hora */}
          <Text style={styles.label}>Data da consulta:</Text>
          <View style={[styles.pickerWrapper, bloquearData && styles.desabilitado]}>
            <Picker
              selectedValue={data}
              onValueChange={setData}
              enabled={!bloquearData}
              dropdownIconColor="#FF7D3B"
            >
              <Picker.Item label="Selecione uma data" value="" color="#999" />
              {datasFiltradas.map((d, i) => (
                <Picker.Item key={i} label={d} value={d} />
              ))}
            </Picker>
          </View>

          {/* Campo Hora */}
          <Text style={styles.label}>Hora da consulta:</Text>
          <View style={[styles.inputWrapper, bloquearHora && styles.desabilitado]}>
            <FontAwesome5 name="clock" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, bloquearHora && styles.inputDesabilitado]}
              placeholder="HH:MM (ex: 14:30)"
              placeholderTextColor="#999"
              value={hora}
              onChangeText={(text) => {
                const formatted = formatarHora(text);
                setHora(formatted);
              }}
              keyboardType="numeric"
              editable={!bloquearHora}
              maxLength={5} // HH:MM tem 5 caracteres
            />
          </View>

          {/* Seção Anamnese */}
          <Text style={styles.sectionTitle}>Detalhes da Consulta</Text>
          
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="notes-medical" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Sintomas apresentados"
              placeholderTextColor="#999"
              value={sintomas}
              onChangeText={setSintomas}
              multiline
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="diagnoses" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Diagnóstico"
              placeholderTextColor="#999"
              value={diagnostico}
              onChangeText={setDiagnostico}
              multiline
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="pills" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Tratamento prescrito"
              placeholderTextColor="#999"
              value={tratamento}
              onChangeText={setTratamento}
              multiline
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="clipboard" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Observações adicionais (opcional)"
              placeholderTextColor="#999"
              value={observacoes}
              onChangeText={setObservacoes}
              multiline
            />
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleSalvarConsulta}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="save" size={18} color="#fff" />
            <Text style={styles.btnText}> Salvar Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 100
  },
  header: {
    backgroundColor: 'rgb(255, 145, 0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 25,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF7D3B',
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '500',
    color: '#555',
    paddingLeft: 5,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    minHeight: 50,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  desabilitado: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  inputDesabilitado: {
    color: '#888',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7D3B',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#FF7D3B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
  },
});