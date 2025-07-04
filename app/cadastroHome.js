import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView ,  Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

   <View style={styles.welcomeContainer}>
  <Text style={styles.welcomeText}>Bem-vindo ao PetCare</Text>
  <Image 
    source={require('../assets/iconePacientes.png')} 
    style={styles.welcomeImage} 
    resizeMode="contain"
  />
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
    style={[styles.card, { backgroundColor: 'rgb(196, 229, 246)' }]}
    onPress={() => navigation.navigate('CadastroPaciente')}
  >
    <FontAwesome5 name="paw" size={40} color="#000" />
    <Text style={styles.cardText}>Cadastrar Paciente</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.card, { backgroundColor: 'rgb(246, 196, 203)' }]}
    onPress={() => navigation.navigate('CadastroConsulta')}
  >
    <FontAwesome5 name="calendar-check" size={40} color="#000" />
    <Text style={styles.cardText}>Agendar Consulta</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.card, { backgroundColor: 'rgb(245, 201, 130)' }]}
    onPress={() => navigation.navigate('CadastroVeterinario')}
  >
    <FontAwesome5 name="stethoscope" size={40} color="#000" />
    <Text style={[styles.cardText, { color: '#000' }]}>Cadastrar Veterinário</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.card, { backgroundColor: 'rgb(167, 223, 201)' }]}
    onPress={() => navigation.navigate('RealizarConsulta')}
  >
    <FontAwesome5 name="notes-medical" size={40} color="#000" />
    <Text style={[styles.cardText, { color: '#000' }]}>Realizar Consulta</Text>
  </TouchableOpacity>
</ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'rgb(254, 210, 108)',
  },
  welcomeContainer: {
    height: 180, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeImage: {
  width: 120,
  height: 120,
},
 buttonsScroll: {
 
  backgroundColor: '#fff',
  paddingHorizontal: 30,
  paddingTop: 40,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  borderWidth: 2,
  borderColor: 'rgb(102, 102, 102)',
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
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
  borderRadius: 30,
  borderWidth: 2,
  borderColor: 'rgba(103, 103, 103, 0.6)',
  marginBottom: 20,
  elevation: 5, // sombra Android
  shadowColor: '#000', // sombra iOS
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  width: '48%',
},
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
     textAlign: 'center', 
  },
  infoText: {
  fontSize: 16,
  color: '#444',
  textAlign: 'center',
  marginBottom: 20,
  paddingHorizontal: 10,
  fontWeight: '500',
  width: '100%',  
},


});
