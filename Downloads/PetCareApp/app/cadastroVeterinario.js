import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView, 
  Platform,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, Feather } from '@expo/vector-icons';

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
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const novoVeterinario = { nome, crmv, especialidade };
    
    try {
      const listaAtualizada = [...veterinarios, novoVeterinario];
      setVeterinarios(listaAtualizada);
      await salvarVeterinarios(listaAtualizada);

      Alert.alert('Sucesso', 'Veterinário cadastrado com sucesso!');
      setNome('');
      setCrmv('');
      setEspecialidade('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o veterinário');
    }
  };

  const handleLimparVeterinarios = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente apagar todos os veterinários cadastrados?',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('veterinarios');
              setVeterinarios([]);
              Alert.alert('Sucesso', 'Todos os veterinários foram removidos');
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cadastro de Veterinário</Text>
          <Feather name="user-plus" size={24} color="#fff" />
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo Nome */}
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user-md" size={18} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* Campo CRMV */}
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="id-card" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Número do CRMV"
              placeholderTextColor="#999"
              value={crmv}
              onChangeText={setCrmv}
              keyboardType="default"
            />
          </View>

          {/* Campo Especialidade */}
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="stethoscope" size={16} color="#FF7D3B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Especialidade"
              placeholderTextColor="#999"
              value={especialidade}
              onChangeText={setEspecialidade}
            />
          </View>

          {/* Botão Cadastrar */}
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleCadastro}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="save" size={18} color="#fff" />
            <Text style={styles.btnText}> Cadastrar Veterinário</Text>
          </TouchableOpacity>

          {/* Botão Limpar */}
          <TouchableOpacity 
            style={styles.btnSecondary} 
            onPress={handleLimparVeterinarios}
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
    marginTop: 10,
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