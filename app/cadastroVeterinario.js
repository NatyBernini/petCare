import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroVeterinarioScreen() {
  const [nome, setNome] = useState('');
  const [crmv, setCrmv] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    const carregarVeterinarios = async () => {
      const data = await AsyncStorage.getItem('veterinarios');
      if (data) setVeterinarios(JSON.parse(data));
    };
    carregarVeterinarios();
  }, []);

  const salvarVeterinarios = async (listaAtualizada) => {
    await AsyncStorage.setItem('veterinarios', JSON.stringify(listaAtualizada));
  };

  const handleCadastro = async () => {
    if (!nome || !crmv || !especialidade) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novoVeterinario = { nome, crmv, especialidade };
    const listaAtualizada = [...veterinarios, novoVeterinario];

    setVeterinarios(listaAtualizada);
    await salvarVeterinarios(listaAtualizada);

    Alert.alert('Sucesso', 'Veterinário cadastrado com sucesso!');
    setNome('');
    setCrmv('');
    setEspecialidade('');
  };

  const handleLimparVeterinarios = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente apagar todos os veterinários?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, apagar',
          onPress: async () => {
            await AsyncStorage.removeItem('veterinarios');
            setVeterinarios([]);
            Alert.alert('Lista zerada', 'Todos os veterinários foram apagados.');
          },
        },
      ]
    );
  };

  return (
      <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={80}
  >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Veterinário</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="CRMV"
          placeholderTextColor="#aaa"
          value={crmv}
          onChangeText={setCrmv}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Especialidade"
          placeholderTextColor="#aaa"
          value={especialidade}
          onChangeText={setEspecialidade}
        />
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar Veterinário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnDanger} onPress={handleLimparVeterinarios}>
        <Text style={styles.btnText}>Limpar todos os veterinários</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
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
};
