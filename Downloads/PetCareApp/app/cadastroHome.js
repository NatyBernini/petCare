import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroHomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView 
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>

          {/* Área da mensagem de boas-vindas */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bem-vindo ao PetCare</Text>
          </View>

          <ScrollView
            style={styles.buttonsScroll}
            contentContainerStyle={styles.buttonsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.infoText}>
              Escolha uma opção abaixo para iniciar o cadastro ou agendar uma consulta:
            </Text>

            <TouchableOpacity
              style={[styles.card]}
              onPress={() => navigation.navigate('CadastroPaciente')}
            >
              <FontAwesome5 name="paw" size={40} color="rgb(81, 81, 81)" style={[styles.iconCard]} />
              <Text style={styles.cardText}>Paciente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card]}
              onPress={() => navigation.navigate('CadastroConsulta')}
            >
              <FontAwesome5 name="calendar-check" size={40} color="rgb(81, 81, 81)" style={[styles.iconCard]} />
              <Text style={styles.cardText}>Agendar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card]}
              onPress={() => navigation.navigate('CadastroVeterinario')}
            >
              <FontAwesome5 name="stethoscope" size={40} color="rgb(81, 81, 81)" style={[styles.iconCard]} />
              <Text style={[styles.cardText]}>Veterinário</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card]}
              onPress={() => navigation.navigate('RealizarConsulta')}
            >
              <FontAwesome5 name="notes-medical" size={40} color="rgb(81, 81, 81)" style={[styles.iconCard]} />
              <Text style={[styles.cardText]}>Realizar Consulta</Text>
            </TouchableOpacity>

          </ScrollView>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  containerScroll: {
    backgroundColor: 'transparent', // transparente para mostrar a imagem
  },
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'transparent', // transparente para mostrar a imagem
  },
  welcomeContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  welcomeText: {
    fontSize: 28,
     fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  buttonsScroll: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 40,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 70,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '48%',
  },
  iconCard: {
    backgroundColor: 'rgb(255, 232, 195)',
    padding: 20,
    borderRadius: 50,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
     fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    color: 'rgb(102, 102, 102)',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
     fontFamily: 'Poppins-Regular',
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: '500',
    width: '100%',
  },
});
