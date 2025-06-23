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
- Link do Manual do Usuário: [manualUsuario](https://www.canva.com/design/DAGrMe5AaPs/nzfVtGUcpxYvLjZ4LhM16w/view?utm_content=DAGrMe5AaPs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf46755cb7b)

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

**Perfil Usuario** | **Petcare Dasbord** | **Tela Inicial** | 
:--:|:--:|:--:|
![PerfilUsuario](https://github.com/user-attachments/assets/c04294bd-b246-4e64-8c00-53d1af554e34)|![Petcare Dashbord](https://github.com/user-attachments/assets/e335dfbe-9e2b-448f-8e7e-b64093b2d976)|![TelaInicial](https://github.com/user-attachments/assets/30c8f09d-1b40-48df-82f8-34d904ca9135)


   
**Cadastro Paciente** | **Cadastro Veterinario** | 
:--:|:--:|
![CadstroPaciente](https://github.com/user-attachments/assets/63be1347-a4dc-4c1d-a26b-156de9c1907b)|![Cadastroveterinario](https://github.com/user-attachments/assets/dabc0ef3-9774-4fea-ab32-40387a53bbf9)





**Historico Consulta Paciente** | **Historico Consulta Veterinario** | **Historico** |
:--:|:--:|--:
![HistoricoConsulta-Paciente](https://github.com/user-attachments/assets/9bfc3cda-f99a-4c23-a350-c55cdf19829d)|![HistoricoConsulta-veterinario](https://github.com/user-attachments/assets/582fd627-8243-4a7c-8f82-db1a45a90c0c)|![HistoricoConsulta](https://github.com/user-attachments/assets/cbd22999-59b6-4a19-b61f-430e15b48161)



**Agendar Consulta** | **Realizar consulta** |
:--:|--:
![AgendaConsulta](https://github.com/user-attachments/assets/82e1e890-0796-4e20-aaca-7da63afee0ff)|![RealizarConsulta](https://github.com/user-attachments/assets/73a73ed1-1b28-401f-9881-4f763de2d146)


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

