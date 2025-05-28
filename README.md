# 📱 App de Autenticação com React Native (Expo)

Este é um aplicativo de autenticação simples feito com **React Native** usando **Expo**, que permite:

- Registro de usuários com **e-mail**, **telefone** (com máscara brasileira) e **senha**.
- Login com e-mail e senha.
- Recuperação de senha com base no e-mail e telefone.
- Armazenamento local usando **AsyncStorage**.
- Criptografia de senhas com **SHA-256** via `crypto-js`.
- Validações de entrada (e-mail, senha forte, confirmação de senha e DDD brasileiro).
- Cadastrar Paciente, Veterinário, Agendar Consulta e Realizar Consulta.

- Link do Projeto no Expo Go: [projeto](https://snack.expo.dev/@ailatan/pet-care)

---
## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [crypto-js](https://www.npmjs.com/package/crypto-js)

---
## 🚀 Funcionalidade de Persistência dos dados

### Carregamento inicial dos dados salvos
Logo quando o componente é montado (useEffect), ele tenta carregar os dados salvos anteriormente:
```useEffect(() => {
  const carregarPacientes = async () => {
    const data = await AsyncStorage.getItem('pacientes');
    if (data) setPacientes(JSON.parse(data));
  };
  carregarPacientes();
}, []);
```
- AsyncStorage.getItem('pacientes'): busca os dados salvos sob a chave 'pacientes'.

- Se encontrar algo, ele converte de volta de JSON para objeto JavaScript e atualiza o estado com setPacientes.

### Salvando dados ao cadastrar um paciente
Quando o usuário preenche o formulário e clica em "Cadastrar Paciente", a função handleCadastro é chamada:
```const handleCadastro = async () => {
  if (!nome || !raca || !sexo || !idade || !pelagem || !nomeTutor || !endereco) {
    Alert.alert('Erro', 'Preencha todos os campos!');
    return;
  }

  const novoPaciente = { nome, raca, sexo, idade, pelagem, nomeTutor, endereco };
  const listaAtualizada = [...pacientes, novoPaciente];

  setPacientes(listaAtualizada);
  await salvarPacientes(listaAtualizada);
```

- Cria um objeto novoPaciente com os dados do formulário.

- Cria uma nova lista com os pacientes antigos + o novo.

- Atualiza o estado local (setPacientes) e também salva essa lista no armazenamento com AsyncStorage.setItem por meio da função salvarPacientes:

 ``` const salvarPacientes = useCallback(
  async (listaAtualizada) => {
    await AsyncStorage.setItem('pacientes', JSON.stringify(listaAtualizada));
  },
  []
);
```
⚠️ É necessário serializar com JSON.stringify() porque AsyncStorage só salva strings.

### Limpando os dados salvos
Quando o usuário clica em "Limpar todos os pacientes", esta função é executada:
```const handleLimparPacientes = () => {
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
```
- Remove as chaves 'pacientes' e 'consultas' de forma permanente.

- Limpa a lista de pacientes em memória (setPacientes([])).

### Ciclo da Persistência
| Ação                      | Função usada                | Local afetado         |
| ------------------------- | --------------------------- | --------------------- |
| Carregar dados salvos     | `AsyncStorage.getItem()`    | Estado inicial do app |
| Salvar novo paciente      | `AsyncStorage.setItem()`    | Armazenamento local   |
| Apagar todos os pacientes | `AsyncStorage.removeItem()` | Armazenamento local   |


- Obs: o mesmo ciclo se aplica para as outras funcionalidades como cadastrar veterinários e realizar consultas.
---

## 📦 Por que usar AsyncStorage em vez de expo-sqlite ou MMKV?
| Tecnologia       | Ideal para...                                   | Prós                                       | Contras                                            |
| ---------------- | ----------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| **AsyncStorage** | Dados simples e persistência básica             | Simples, compatível com Expo Go            | Lento para grandes volumes, não relacional         |
| **Expo SQLite**  | Dados estruturados, relacionais e consultas SQL | Suporte a SQL, ideal para muitos dados     | Mais verboso, exige mais configuração e manutenção |
| **MMKV**         | Armazenamento de alta performance (key-value)   | Extremamente rápido, persistência imediata | Não compatível com Expo Go (exige eject)           |

✅ Quando usar cada um?
| Caso de Uso                             | Melhor Opção             |
| --------------------------------------- | ------------------------ |
| Salvar token de autenticação            | `MMKV` ou `SecureStore`  |
| Armazenar lista simples (ex: pacientes) | `AsyncStorage` ou `MMKV` |
| Persistir grande volume de dados        | `SQLite`, `Realm`, etc.  |
| App com busca, filtros, ordenações      | `SQLite`                 |
| Configurações, flags, status do app     | `MMKV` ou `AsyncStorage` |

🚀 Por que escolhemos AsyncStorage?
Neste projeto, foi utilizado o @react-native-async-storage/async-storage porque:

- A estrutura de dados é simples (lista de pacientes).

- Não há necessidade de consultas complexas ou relacionamentos entre dados.

- É fácil de implementar e compatível com o Expo Go (sem necessidade de eject).

- Boa escolha para persistência local leve.


## 📸 Capturas de Tela

**Android** | **IOS** | **WEB** | **Usuário Logado***
:--:|:--:|:--:|:--:
<img src="pet-care/assets/screens/android.png" width="200"/> | <img src="pet-care/assets/screens/ios.png" width="200"/> | <img src="pet-care/assets/screens/WEb.png" width="200"/> | <img src="pet-care/assets/screens/testeUsuarioLogado.png" width="200"/>

**DDD inválido** | **Recuperar Senha** | **Email ou Senha Incorretos** | **Telefone Incorreto***
:--:|:--:|:--:|:--:
<img src="pet-care/assets/screens/testeDDDInvalido.png" width="200"/> | <img src="pet-care/assets/screens/testeSenhaRedefinidaSucesso.png" width="200"/> | <img src="pet-care/assets/screens/testeEmailSenhaIncorreta.png" width="200"/> | <img src="pet-care/assets/screens/testeRedefinirSenhaTelefoneIncorreto.png" width="200"/>

**Registro com Sucesso** | **Senhas não Coincidem** | **Senha Fora do Padrão** | **Email fora do Padrão***
:--:|:--:|:--:|:--:
<img src="pet-care/assets/screens/registroSucesso.png" width="200"/> | <img src="pet-care/assets/screens/testeSenhasNaoCoincidem.png" width="200"/> | <img src="pet-care/assets/screens/testeSenhaForaPadrao.png" width="200"/> | <img src="pet-care/assets/screens/testeEmailForaPadrao.png" width="200"/>

**Campos Obrigatórios** | **Usuário Não Encontrado** | **Senha Criptografada**
:--:|:--:|:--:
<img src="pet-care/assets/screens/testeCamposObrigatorios.png" width="200"/> | <img src="pet-care/assets/screens/testeUsuarioNaoEncontrado.png" width="200"/> | <img src="pet-care/assets/screens/senhaCriptografada.png" width="200"/> 
---

## 🛠 Instalação

### 1. Pré-requisitos
- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo físico ou emulador Android/iOS
- Editor de código (VS Code recomendado)

### 2. Instale as dependências
```bash
npm install
```

---

## 🚀 Integrantes do Projeto

- Júlia Vitória
- Natália Beatriz Malta Bernini

Centro Unversitário Presidente Antônio Carlos - Barbacena

Disciplina: Programação Para Dispositivos Móveis

Orientador: Rodrigo Fernandes dos Santos

---

