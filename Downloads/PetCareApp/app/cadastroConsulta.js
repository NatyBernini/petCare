import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function CadastroConsultaScreen() {
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [veterinarioSelecionado, setVeterinarioSelecionado] = useState('');

  // Máscara para data (formato DD/MM/YYYY)
  const handleDataChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, '');
    
    if (formattedText.length > 2) {
      formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5, 9);
    }
    
    setDataConsulta(formattedText);
  };


  const handleHoraChange = (text) => {
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
  
  setHoraConsulta(numericValue);
};

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
    // Converte a data para o formato YYYY-MM-DD
    const dataParts = dataConsulta.split('/');
    const dataFormatada = dataParts.length === 3 
      ? `${dataParts[2]}-${dataParts[1]}-${dataParts[0]}` 
      : dataConsulta;

    if (!dataFormatada || !horaConsulta || !pacienteSelecionado || !veterinarioSelecionado) {
      Alert.alert('Atenção', 'Preencha todos os campos corretamente!');
      return;
    }

    const novaConsulta = {
      paciente: pacienteSelecionado,
      veterinario: veterinarioSelecionado,
      data: dataFormatada,
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Agendar Consulta</Text>
          <Feather name="calendar" size={24} color="#fff" />
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Seletor de Paciente */}
          <Text style={styles.sectionTitle}>Paciente</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={pacienteSelecionado}
              onValueChange={setPacienteSelecionado}
              dropdownIconColor="#FF7D3B"
            >
              <Picker.Item label="Selecione um paciente" value="" color="#999" />
              {pacientes.map((p, i) => (
                <Picker.Item key={i} label={p.nome} value={p.nome} />
              ))}
            </Picker>
          </View>

          {/* Seletor de Veterinário */}
          <Text style={styles.sectionTitle}>Veterinário</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={veterinarioSelecionado}
              onValueChange={setVeterinarioSelecionado}
              dropdownIconColor="#FF7D3B"
            >
              <Picker.Item label="Selecione um veterinário" value="" color="#999" />
              {veterinarios.map((v, i) => (
                <Picker.Item key={i} label={v.nome} value={v.nome} />
              ))}
            </Picker>
          </View>

          {/* Data da Consulta */}
          <Text style={styles.sectionTitle}>Data e Hora</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="calendar-alt" size={18} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataConsulta}
              onChangeText={handleDataChange}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          {/* Hora da Consulta */}
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="clock" size={18} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={horaConsulta}
              onChangeText={handleHoraChange}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          {/* Botão de Agendamento */}
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleAgendar} 
            activeOpacity={0.8}
          >
            <FontAwesome5 name="calendar-check" size={18} color="#fff" />
            <Text style={styles.btnText}> Agendar Consulta</Text>
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
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7D3B',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
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