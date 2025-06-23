# 📱 App PetCare com React Native (Expo)

Este é um aplicativo de autenticação simples feito com **React Native** usando **Expo**, que permite:

- Registro de usuários com **e-mail**, **telefone** (com máscara brasileira) e **senha**.
- Login com e-mail e senha.
- Recuperação de senha com base no e-mail e telefone.
- Armazenamento local usando **AsyncStorage**.
- Criptografia de senhas com **SHA-256** via `crypto-js`.
- Validações de entrada (e-mail, senha forte, confirmação de senha e DDD brasileiro).2
- Cadastro de pacientes , veterinários e agendamento de consulta.

- Link do Projeto no Expo Go: [projeto](https://snack.expo.dev/@ailatan/pet-care)
- Link do Manual do Usuário pelo Canva: [manualUsuario](https://www.canva.com/design/DAGrMe5AaPs/nzfVtGUcpxYvLjZ4LhM16w/view?utm_content=DAGrMe5AaPs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf46755cb7b)
- Link do Manual do Usuário em PDF: [manual_usuario.pdf](https://github.com/user-attachments/files/20872494/Cartao.de.visita.para.Medica.veterinaria.ilustrado.minimalista.verde.azul.pdf)

---

## 🧠 Persistência de Dados Funcionalidades:

Utiliza AsyncStorage para armazenar dados localmente no dispositivo, garantindo que informações importantes, como cadastros e agendamentos, permaneçam disponíveis mesmo após o app ser fechado ou em situações sem conexão com a internet.



👤 Funcionalidades - Paciente

- Cadastro de novos pacientes.
- Consulta e listagem dos pacientes já registrados.
- remoção de pacientes com atualização imediata dos dados persistidos.



👨‍⚕️ Funcionalidades - Veterinário

- Cadastro de veterinários.
- Consulta de veterinários cadastrados com busca facilitada.
- Remoção de veterinários de forma simples e persistente.



📅 Funcionalidades - Consulta

- Agendamento de consultas entre pacientes e veterinários.
- Armazenamento local das informações da consulta.
- Consulta e listagem das consultas agendadas com persistência.




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

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [crypto-js](https://www.npmjs.com/package/crypto-js)

 ## 🚀 Tecnologias Utilizadas Para Persistencia
 
  - [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
    
Foi utilizado por permitir o armazenamento local de dados de forma persistente, mesmo após o app ser fechado, garantindo melhor experiência ao usuário.
Além disso, destaca-se por sua simplicidade de uso.


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
![Tela-Inicial](https://github.com/user-attachments/assets/9dbae216-5aec-41e3-920e-40c2265e1852)
![Tela-Login](https://github.com/user-attachments/assets/a6aabcb7-bf45-48d9-bc53-2983cf0c0cdb)
![Tela-Registrar](https://github.com/user-attachments/assets/ba49e1c5-f6b8-4063-bc6d-1a024785b3fd)
![Tela-Recuperar-Senha](https://github.com/user-attachments/assets/455b2517-1df5-48ff-b25e-9dd71250e713)
![Tela-Funcionalidades](https://github.com/user-attachments/assets/a12e41d4-b939-4847-9cbf-3103d48f53f4)
![Tela-Dashboard](https://github.com/user-attachments/assets/98178653-7aa8-4da3-8e55-6daff8b91c8e)
![Tela-Cadastro-Paciente](https://github.com/user-attachments/assets/73876146-7c75-4162-aa08-4d6e721ec834)
![Tela-Detalhamento-Paciente](https://github.com/user-attachments/assets/b4951f2a-e625-4ad8-92e7-cb19ad312e2a)
![Tela-Perfil](https://github.com/user-attachments/assets/b6439fd4-3208-4e98-a64d-3b2d650e32a5)



---

## 🛠 Instalação

### 1. Pré-requisitos
- Node.js
- Expo CLI 
- Dispositivo físico ou emulador Android/iOS
- Editor de código (VS Code recomendado)

- Instale o Expo:
  ```base
    npm install -g expo-cli
  ```
  
### 2. Instale as dependências
```bash
npm install
```

### 3. Inicializando o Projeto
```bash
npx expo start
```

---
## ✅ Testando os Recursos

1. Cadastro de Paciente
   
- Acesse a tela "Cadastrar Paciente"
- Preencha os campos obrigatórios.
- Clique em "Cadastrar paciente".
 
   
2. Cadastro de Veterinário
   
- Acesse a tela "Cadastrar Veterinário"
- Informe os campos obrigatorios
- Clique em "Cadastrar Veterinario"
- Use a opção "Consultar Veterinário" para validar o cadastro.
  
3. Agendamento de Consulta
   
- Vá até "Agendar Consulta"
- Selecione um paciente e um veterinário já cadastrados
- Escolha a data e horário
- Clique em "Agendar Consulta"
- A consulta deve aparecer em "Agenda de Consultas"

4. Consultar Pacientes, Veterinários e Consultas
      
- Acesse as telas de consulta
- Verifique se os registros anteriores aparecem corretamente
- Teste reiniciando o app para validar a persistência

---

## 🚀 Integrantes do Projeto

- Júlia Vitória Santos Costa
- Natália Beatriz Malta Bernini

Centro Unversitário Presidente Antônio Carlos - Barbacena

Disciplina: Programação Para Dispositivos Móveis

Orientador: Rodrigo Fernandes dos Santos

---

