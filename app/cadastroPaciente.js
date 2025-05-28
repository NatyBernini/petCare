import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente memoizado para evitar rerenders desnecessários
const InputWithIcon = React.memo(
  ({ iconName, placeholder, value, onChangeText, keyboardType = 'default' }) => {
    return (
      <View style={styles.inputWrapper}>
        <FontAwesome5 name={iconName} size={20} color="#007AFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
          importantForAutofill="no"
          autoComplete="off"
          textContentType="none"
          // Mantém o teclado aberto ao tocar fora do input
          blurOnSubmit={false}
          returnKeyType="next"
        />
      </View>
    );
  }
);

export default function CadastroPacienteScreen() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [pelagem, setPelagem] = useState('');
  const [nomeTutor, setNomeTutor] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const carregarPacientes = async () => {
      const data = await AsyncStorage.getItem('pacientes');
      if (data) setPacientes(JSON.parse(data));
    };
    carregarPacientes();
  }, []);

  const salvarPacientes = useCallback(
    async (listaAtualizada) => {
      await AsyncStorage.setItem('pacientes', JSON.stringify(listaAtualizada));
    },
    []
  );

  const handleCadastro = async () => {
    if (!nome || !raca || !sexo || !idade || !pelagem || !nomeTutor || !endereco) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novoPaciente = { nome, raca, sexo, idade, pelagem, nomeTutor, endereco };
    const listaAtualizada = [...pacientes, novoPaciente];

    setPacientes(listaAtualizada);
    await salvarPacientes(listaAtualizada);

    Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
    setNome('');
    setRaca('');
    setSexo('');
    setIdade('');
    setPelagem('');
    setNomeTutor('');
    setEndereco('');
  };

  const handleLimparPacientes = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente apagar todos os pacientes e consultas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, apagar',
          onPress: async () => {
            await AsyncStorage.removeItem('pacientes');
            await AsyncStorage.removeItem('consultas');
            setPacientes([]);
            Alert.alert('Lista zerada', 'Todos os pacientes e consultas foram apagados.');
          },
        },
      ]
    );
  };

 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={100} // ajuste se necessário
  >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Cadastro de Paciente (Animal)</Text>

      <InputWithIcon iconName="dog" placeholder="Nome" value={nome} onChangeText={setNome} />
      <InputWithIcon iconName="paw" placeholder="Raça" value={raca} onChangeText={setRaca} />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, sexo === 'Macho' && styles.radioSelected]}
          onPress={() => setSexo('Macho')}
        >
          <Text style={[styles.radioText, sexo === 'Macho' && styles.radioTextSelected]}>Macho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioButton, sexo === 'Fêmea' && styles.radioSelected]}
          onPress={() => setSexo('Fêmea')}
        >
          <Text style={[styles.radioText, sexo === 'Fêmea' && styles.radioTextSelected]}>Fêmea</Text>
        </TouchableOpacity>
      </View>

      <InputWithIcon
        iconName="sort-numeric-up"
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <InputWithIcon iconName="palette" placeholder="Pelagem" value={pelagem} onChangeText={setPelagem} />
      <InputWithIcon iconName="user" placeholder="Nome do Tutor" value={nomeTutor} onChangeText={setNomeTutor} />
      <InputWithIcon
        iconName="map-marker-alt"
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity style={styles.btnPrimary} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnDanger} onPress={handleLimparPacientes}>
        <Text style={styles.btnText}>Limpar todos os pacientes</Text>
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#007AFF',
  },
  radioText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  radioTextSelected: {
    color: '#fff',
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
  btnDanger: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#ff4d4d',
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
