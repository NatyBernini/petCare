import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SHA256 from 'crypto-js/sha256';
import { validateDDD } from 'validate-ddd-br';
import TabNavigator from './app/components/TabNavigator';
import * as Font from 'expo-font';

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
      const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
    const loadUsers = async () => {
      const data = await AsyncStorage.getItem('users');
      if (data) setUsers(JSON.parse(data));
    };
    loadUsers();
  }, []);

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
   <ImageBackground
      source={require('./assets/fundo.png')}
      style={[styles.background, { height: windowHeight }]}
      resizeMode="cover"
    >

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {recoveryMode ? 'Recuperar Senha' : isLogin ? 'Login' : 'Registro'}
          </Text>

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
              <Button title="Redefinir Senha" onPress={handlePasswordReset} />
              <TouchableOpacity onPress={() => {
                setRecoveryMode(false);
                setMessage('');
              }}>
                <Text style={styles.backToHome}>Voltar para o início</Text>
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
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {fontFamily: 'Poppins-Regular', fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {fontFamily: 'Poppins-Regular', borderBottomWidth: 1, marginBottom: 20, padding: 10 },
  toggle: { fontFamily: 'Poppins-Regular',marginTop: 10, color: '#007bff', textAlign: 'center' },
  forgotPassword: {fontFamily: 'Poppins-Regular', marginTop: 10, color: 'tomato', textAlign: 'center' },
  message: { fontFamily: 'Poppins-Regular',marginTop: 20, color: 'green', fontWeight: 'bold', textAlign: 'center' },
  backToHome: {    fontFamily: 'Poppins-Regular', marginTop: 15, color: '#007bff', textAlign: 'center', fontWeight: 'bold' },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  authButton: {
    backgroundColor: '#66CDAA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
     fontFamily: 'Poppins-Bold'
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
});
