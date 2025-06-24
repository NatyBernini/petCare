# 📱 App PetCare com React Native (Expo)

Aplicativo desenvolvido através de React Native para otimizar o atendimento em clínicas veterinárias.

## Funcionalidades
- Registro de usuários com **e-mail**, **telefone** e **senha**.
- Login com e-mail e senha.
- Recuperação de senha com base no e-mail e telefone.
- Armazenamento local usando **AsyncStorage**.
- Criptografia de senhas com **SHA-256** via `crypto-js`.
- Cadastro de pacientes , veterinários e agendamento/realização de consulta.

## Links do Projeto
- Projeto no Expo Go: [projeto](https://snack.expo.dev/@ailatan/pet-care)
- Manual do Usuário pelo Canva: [manualUsuario](https://www.canva.com/design/DAGrMe5AaPs/nzfVtGUcpxYvLjZ4LhM16w/view?utm_content=DAGrMe5AaPs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf46755cb7b)
- Manual do Usuário em PDF: [manual_usuario.pdf](https://github.com/user-attachments/files/20872494/Cartao.de.visita.para.Medica.veterinaria.ilustrado.minimalista.verde.azul.pdf)

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

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [AsyncStorage](https://reactnative.dev/docs/asyncstorage)
- [FontAwesome](https://fontawesome.com)

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
- Editor de código (VSCode recomendado)
[VSCode-Link](https://code.visualstudio.com)

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

Obs: Caso esse passo a passo gere algumas dúvidas, disponibilizamos um manual com prints das telas do sistema.
- Manual do Usuário pelo Canva: [manualUsuario](https://www.canva.com/design/DAGrMe5AaPs/nzfVtGUcpxYvLjZ4LhM16w/view?utm_content=DAGrMe5AaPs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf46755cb7b)
- Manual do Usuário em PDF: [manual_usuario.pdf](https://github.com/user-attachments/files/20872494/Cartao.de.visita.para.Medica.veterinaria.ilustrado.minimalista.verde.azul.pdf)

---

## 🚀 Integrantes do Projeto

- Júlia Vitória Santos Costa
- Natália Beatriz Malta Bernini

Centro Unversitário Presidente Antônio Carlos - Barbacena

Disciplina: Programação Para Dispositivos Móveis

Orientador: Rodrigo Fernandes dos Santos

---

