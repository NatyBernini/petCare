# 📱 App de Autenticação com React Native (Expo)

Este é um aplicativo de autenticação simples feito com **React Native** usando **Expo**, que permite:

- Registro de usuários com **e-mail**, **telefone** (com máscara brasileira) e **senha**.
- Login com e-mail e senha.
- Recuperação de senha com base no e-mail e telefone.
- Armazenamento local usando **AsyncStorage**.
- Criptografia de senhas com **SHA-256** via `crypto-js`.
- Validações de entrada (e-mail, senha forte, confirmação de senha e DDD brasileiro).

- Link do Projeto no Expo Go: [projeto](https://snack.expo.dev/@ailatan/pet-care)

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [crypto-js](https://www.npmjs.com/package/crypto-js)

---

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

