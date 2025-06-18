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
import { FontAwesome5, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente de input com ícone
const InputWithIcon = React.memo(
  ({ iconName, placeholder, value, onChangeText, keyboardType = 'default' }) => {
    return (
      <View style={styles.inputWrapper}>
        <FontAwesome5 name={iconName} size={18} color="#FF7D3B" style={styles.inputIcon} />
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

  // Carrega pacientes existentes
  useEffect(() => {
    const carregarPacientes = async () => {
      const data = await AsyncStorage.getItem('pacientes');
      if (data) setPacientes(JSON.parse(data));
    };
    carregarPacientes();
  }, []);

  // Salva lista de pacientes
  const salvarPacientes = useCallback(async (listaAtualizada) => {
    await AsyncStorage.setItem('pacientes', JSON.stringify(listaAtualizada));
  }, []);

  // Cadastra novo paciente
  const handleCadastro = async () => {
    if (!nome || !raca || !sexo || !idade || !pelagem || !nomeTutor || !endereco) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const novoPaciente = { 
      nome, 
      raca, 
      sexo, 
      idade, 
      pelagem, 
      nomeTutor, 
      endereco 
    };

    try {
      const listaAtualizada = [...pacientes, novoPaciente];
      setPacientes(listaAtualizada);
      await salvarPacientes(listaAtualizada);
      
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
      
      // Limpa os campos
      setNome('');
      setRaca('');
      setSexo('');
      setIdade('');
      setPelagem('');
      setNomeTutor('');
      setEndereco('');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o paciente');
    }
  };

  // Limpa todos os pacientes
  const handleLimparPacientes = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente apagar todos os pacientes cadastrados?',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('pacientes');
              setPacientes([]);
              Alert.alert('Sucesso', 'Todos os pacientes foram removidos');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar os dados');
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cadastro de Paciente</Text>
          <Feather name="plus-circle" size={24} color="#fff" />
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Informações do Animal */}
          <Text style={styles.sectionTitle}>Informações do Animal</Text>
          
          <InputWithIcon 
            iconName="dog" 
            placeholder="Nome do Animal" 
            value={nome} 
            onChangeText={setNome} 
          />
          
          <InputWithIcon 
            iconName="paw" 
            placeholder="Raça" 
            value={raca} 
            onChangeText={setRaca} 
          />

          <Text style={styles.label}>Sexo:</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[styles.radioButton, sexo === 'Macho' && styles.radioSelected]}
              onPress={() => setSexo('Macho')}
            >
              <FontAwesome5 name="mars" size={16} color={sexo === 'Macho' ? '#fff' : '#FF7D3B'} />
              <Text style={[styles.radioText, sexo === 'Macho' && styles.radioTextSelected]}> Macho</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioButton, sexo === 'Fêmea' && styles.radioSelected]}
              onPress={() => setSexo('Fêmea')}
            >
              <FontAwesome5 name="venus" size={16} color={sexo === 'Fêmea' ? '#fff' : '#FF7D3B'} />
              <Text style={[styles.radioText, sexo === 'Fêmea' && styles.radioTextSelected]}> Fêmea</Text>
            </TouchableOpacity>
          </View>

          <InputWithIcon
            iconName="sort-numeric-up"
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />
          
          <InputWithIcon 
            iconName="palette" 
            placeholder="Pelagem" 
            value={pelagem} 
            onChangeText={setPelagem} 
          />

          {/* Informações do Tutor */}
          <Text style={styles.sectionTitle}>Informações do Tutor</Text>
          
          <InputWithIcon 
            iconName="user" 
            placeholder="Nome do Tutor" 
            value={nomeTutor} 
            onChangeText={setNomeTutor} 
          />
          
          <InputWithIcon
            iconName="map-marker-alt"
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
          />

          {/* Botões de Ação */}
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleCadastro}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="save" size={18} color="#fff" />
            <Text style={styles.btnText}> Cadastrar Paciente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary} 
            onPress={handleLimparPacientes}
            activeOpacity={0.8}
          >
            <Feather name="trash-2" size={18} color="#FF7D3B" />
            <Text style={styles.btnSecondaryText}> Limpar Todos</Text>
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
    paddingTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 25,
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#FF7D3B',
    backgroundColor: '#fff',
    width: '48%',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#FF7D3B',
  },
  radioText: {
    color: '#FF7D3B',
    fontWeight: '600',
    fontSize: 15,
  },
  radioTextSelected: {
    color: '#fff',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7D3B',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 15,
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
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF7D3B',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnSecondaryText: {
    color: '#FF7D3B',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
});