// app/perfil.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const PerfilScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../assets/iconeAdocaoGato.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>🐾 Perfil do Usuário</Text>



        
        <View style={styles.devSection}>
          <Text style={styles.devTitle}>Desenvolvido por:</Text>
          <Text style={styles.devText}>✨ Natália Bernini</Text>
          <Text style={styles.devText}>✨ Júlia Vitória</Text>
          <Text style={styles.university}>🎓 UNIPAC - Ciência da Computação</Text>
        </View>

                <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnText}>Deslogar</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  welcomeImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 30,
  },
  btnLogout: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginTop: 35,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  devSection: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderTopWidth: 2,
    borderTopColor:'rgb(80, 80, 80)',
    borderWidth: 2,
    borderColor: 'rgb(80, 80, 80)',
  },
  devTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  devText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  university: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default PerfilScreen;
