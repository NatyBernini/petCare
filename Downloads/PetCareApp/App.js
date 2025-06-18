import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, ScrollView,  KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SHA256 from 'crypto-js/sha256';
import { validateDDD } from 'validate-ddd-br';
import TabNavigator from './app/components/TabNavigator';
import * as Font from 'expo-font';
import WelcomeScreen from './app/WelcomeScreen';

const windowHeight = Dimensions.get('window').height;

const hashPassword = (password) => SHA256(password).toString();
const comparePassword = (input, stored) => hashPassword(input) === stored;

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isStrongPassword = (password) => {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,16}$/;
  return regex.test(password);
};

const isValidDDD = (phone) => {
  const ddd = phone.replace(/\D/g, '').substring(0, 2);
  return validateDDD(ddd);
};

function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);

  // Estados separados para recuperação de senha
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState('');

  const [fontsLoaded, setFontsLoaded] = useState(false);


useEffect(() => {
  if (navigation && navigation.getState) {
    const route = navigation.getState().routes.find(r => r.name === 'Auth');
    if (route?.params?.isLogin !== undefined) {
      setIsLogin(route.params.isLogin);
    }
  }

  // Carrega fontes e usuários
  const loadAll = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);

    const data = await AsyncStorage.getItem('users');
    if (data) setUsers(JSON.parse(data));
  };
  loadAll();
}, [navigation]);


  const saveUsers = async (updatedUsers) => {
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const toggleForm = () => {
    setMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setIsLogin(!isLogin);
    setRecoveryMode(false);
  };

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !phone) || (!isLogin && !confirmPassword)) {
      setMessage('Preencha todos os campos');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Email inválido.');
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage('A senha deve conter entre 8 e 16 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (!isLogin && !isValidDDD(phone)) {
      setMessage('DDD inválido.');
      return;
    }

   if (isLogin) {
  const user = users.find(u => u.email === email);
  if (!user) {
    setMessage('Usuário não encontrado.');
    return;
  }
  if (!comparePassword(password, user.password)) {
    setMessage('Senha incorreta.');
    return;
  }

  setMessage('');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Home' }],
  });
}
 else {
      if (users.find(u => u.email === email)) {
        setMessage('Usuário já existe.');
        return;
      }
      const newUser = { email, phone, password: hashPassword(password) };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await saveUsers(updatedUsers);
      setMessage('Registrado com sucesso!');
    }
  };

  const handleForgotPassword = () => {
    setRecoveryMode(true);
    setMessage('');
    setEmail('');
    setPhone('');
    setRecoveryPassword('');
    setRecoveryConfirmPassword('');
  };

  const handlePasswordReset = async () => {
    if (!email || !phone || !recoveryPassword || !recoveryConfirmPassword) {
      setMessage('Preencha todos os campos');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Email inválido.');
      return;
    }

    if (!isStrongPassword(recoveryPassword)) {
      setMessage('A nova senha deve conter entre 8 e 16 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    if (recoveryPassword !== recoveryConfirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (!isValidDDD(phone)) {
      setMessage('DDD inválido.');
      return;
    }

    const userIndex = users.findIndex(u => u.email === email && u.phone === phone);
    if (userIndex === -1) {
      setMessage('Email ou telefone inválido.');
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex].password = hashPassword(recoveryPassword);
    setUsers(updatedUsers);
    await saveUsers(updatedUsers);

    setMessage('Senha redefinida com sucesso!');
    setRecoveryMode(false);
    setEmail('');
    setPhone('');
    setRecoveryPassword('');
    setRecoveryConfirmPassword('');
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  return (
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1, backgroundColor: "#fff" }}
>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
<ImageBackground
  source={require('./assets/background.png')}
  style={styles.mainContainer}
  resizeMode="cover"
>
  {/* Parte superior branca com curva */}
  <View style={styles.topContainer}>
    
  </View>

  {/* Parte inferior com os campos */}

<View style={styles.scrollContent}>
  
    <Text style={styles.topTitle}>
      {recoveryMode ? 'Recuperar Senha' : isLogin ? 'Login' : 'Registro'}
    </Text>
    <View style={styles.card}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {(!isLogin || recoveryMode) && (
        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#999"
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
          keyboardType="phone-pad"
        />
      )}

      {recoveryMode ? (
        <>
          <TextInput
            placeholder="Nova Senha"
            placeholderTextColor="#999"
            style={styles.input}
            value={recoveryPassword}
            onChangeText={setRecoveryPassword}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirmar Nova Senha"
            placeholderTextColor="#999"
            style={styles.input}
            value={recoveryConfirmPassword}
            onChangeText={setRecoveryConfirmPassword}
            secureTextEntry
          />
         
          <TouchableOpacity style={styles.authButton} onPress={handlePasswordReset}>
            <Text style={styles.authButtonText}>Redefinir Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setRecoveryMode(false);
            setMessage('');
          }}>
            <Text style={styles.toggle}>Voltar para o início</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {!isLogin && (
            <TextInput
              placeholder="Confirmar Senha"
              placeholderTextColor="#999"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>{isLogin ? 'Entrar' : 'Registrar'}</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.message}>{message}</Text>

      {!recoveryMode && (
        <>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.toggle}>
              {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Login'}
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
 </View>
</ImageBackground>

 </ScrollView>
</KeyboardAvoidingView>
  );
}

// ------------------- TELA INICIAL -------------------
// const HomeScreen = ({ navigation }) => {
//   const [uf, setUf] = useState('');
//   const [crmv, setCrmv] = useState('');
//   const [resultado, setResultado] = useState(null);
//   const [erro, setErro] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchVeterinario = async () => {
//     if (!uf || !crmv) {
//       setErro('Preencha UF e CRMV');
//       setResultado(null);  // Limpa o resultado se os campos não estiverem preenchidos
//       return;
//     }
  
//     const token = '9eqONbGtrhO0YbSzqwHUnXkO8NekwPdGlVL8ItCp';
//     const tipo_inscricao = '0';
//     const url = `https://api.infosimples.com/api/v2/consultas/cfmv/cadastro?token=${token}&tipo_inscricao=${tipo_inscricao}&uf=${uf}&query=${crmv}`;
  
//     setLoading(true);
//     setErro(null);  
//     setResultado(null); // Limpa o resultado antes de fazer a nova requisição
//     console.log('Requisição feita para:', url); // Log da URL da requisição
  
//     try {
//       const response = await fetch(url);
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const json = await response.json();
//       console.log('Resposta completa:', json); // Isso mostra toda a resposta da API
  
//       // A mensagem que vem no campo code_message será usada
//       if (json.code === 200) {
//         if (json.data && json.data[0].resultados.length > 0) {
//           const resultados = json.data[0].resultados[0]; // Acessando o array 'resultados'
//           console.log('Resultados:', resultados); // Log para ver o conteúdo completo
  
//           setResultado(resultados);
//         } else {
//           setErro(json.code_message); // Usa a mensagem que vem no campo code_message
//         }
//       } else {
//         setErro(`Erro: ${json.code_message}`);
//       }
  
//     } catch (e) {
//       console.error('Erro detalhado:', {
//         message: e.message,
//         stack: e.stack,
//         name: e.name
//       });
//       setErro(`Erro ao consultar API: ${e.message}`);
//     }
  
//     setLoading(false);
//   };
  
  
  

//   return (
//     <ImageBackground
//       source={require('./assets/fundo.png')}
//       style={[styles.background, { height: windowHeight }]}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.title}>Bem-vindo!</Text>
// {/* 
//           <TextInput
//             placeholder="UF (ex: MG)"
//             placeholderTextColor="#999"
//             style={styles.input}
//             value={uf}
//             onChangeText={setUf}
//             autoCapitalize="characters"
//             maxLength={2}
//           />
//           <TextInput
//             placeholder="CRMV (ex: 27216)"
//             placeholderTextColor="#999"
//             style={styles.input}
//             value={crmv}
//             onChangeText={setCrmv}
//             keyboardType="numeric"
//           />

//           <TouchableOpacity style={styles.authButton} onPress={fetchVeterinario}>
//             <Text style={styles.authButtonText}>Consultar Veterinário</Text>
//           </TouchableOpacity>

//           {loading && <Text style={styles.message}>Carregando...</Text>}

//           {erro !== '' && <Text style={[styles.message, { color: 'red' }]}>{erro}</Text>}

//           {resultado && (
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.message}>Resultado:</Text>
//               <Text style={{ textAlign: 'center' }}>
//                 {`Nome: ${resultado.nome}\nCRMV: ${resultado.crmv}\nSituacao: ${resultado.situacao}\nUF: ${resultado.uf}\nArea: ${resultado.area}\nData de Inscricao: ${resultado.data_inscricao}\nInscricao: ${resultado.inscricao}`}
//               </Text>
//             </View>
//           )} */}

//             <TouchableOpacity
//         style={styles.botao}
//         onPress={() => navigation.navigate('Cadastro')}
//       >
//         <Text style={styles.textoBotao}>Cadastrar Novo Paciente</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.botao}
//         onPress={() => navigation.navigate('Pacientes')}
//       >
//         <Text style={styles.textoBotao}>Ver Pacientes Cadastrados</Text>
//       </TouchableOpacity>

//           <Button title="Deslogar" onPress={() => navigation.replace('Auth')} />
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// ------------------- APP COM NAVEGAÇÃO -------------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 mainContainer: {
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},

  topContainer: {
    width: '100%',
    height: windowHeight * 0.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  topTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(73, 73, 73)',
    borderBottomWidth: 2,
    borderBottomColor: '#FF7D3B',
    paddingBottom: 4,
    alignSelf: 'flex-start', // linha acompanha tamanho do texto
  },

  scrollContent: {
    width: '100%',
  paddingBottom: 40,
  flexGrow: 1,
  justifyContent: 'center', 
  backgroundColor: '#fff',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 140,
  padding: 30,
  paddingTop: 30,
},

  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 140,
    padding: 30,
    paddingTop: 30
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginTop: 40,
    elevation: 5,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 8,
  },
  authButton: {
    backgroundColor: '#FF7D3B',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  toggle: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },
  forgotPassword: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    color: 'tomato',
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
