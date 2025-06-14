import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const { height } = Dimensions.get('window');
const ORANGE = '#FF7D3B';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Seção superior com imagem de fundo */}
      <ImageBackground
        source={require('../assets/Lua.png')} // sua imagem de fundo
        style={styles.topSection}
        resizeMode="contain"
      >
      </ImageBackground>

      {/* Seção inferior branca com botão e textos */}
      <View style={styles.bottomSection}>
        
        <Text style={styles.title}>Cuide do seu Pet</Text>
        <Text style={styles.subtitle}>
          Fortaleça sua relação entre <Text style={styles.highlight}>pets & humanos</Text>
        </Text>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Auth', { isLogin: true })}
        >
        <FontAwesome
            name="arrow-right"
            size={20}
            color={ORANGE}
            style={styles.iconLeft}
        />
        <Text style={styles.buttonText}>Vamos começar</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE,
  },
  topSection: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
    padding: 50
  },

  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 12,
  },
  bottomSection: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  highlight: {
    color: ORANGE,
    fontWeight: '600',
  },
   button: {
    position: 'relative',      // importante para o filho absoluto
    backgroundColor: ORANGE,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: ORANGE,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,

    alignItems: 'center',
    justifyContent: 'center',  // centraliza o texto no botão
  },
  iconLeft: {
    position: 'absolute',
    left: 5,                 // distância da esquerda
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 9,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
