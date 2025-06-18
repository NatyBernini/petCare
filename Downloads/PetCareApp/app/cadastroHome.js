import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView ,  Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.containerScroll}
  showsVerticalScrollIndicator={false}
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
  <FontAwesome5 name="stethoscope" size={40} color="rgb(81, 81, 81)" style={[styles.iconCard]}  />
  <Text style={[styles.cardText]}>Veterinário</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.card]}
  onPress={() => navigation.navigate('RealizarConsulta')}
>
  <FontAwesome5 name="notes-medical" size={40} color="	rgb(81, 81, 81)" style={[styles.iconCard]}/>
  <Text style={[styles.cardText]}>Realizar Consulta</Text>
</TouchableOpacity>

</ScrollView>


    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: '#fff'
  },
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'rgb(255, 145, 0)',
  },
  welcomeContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeImage: {
  width: 120,
  height: 120,
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
  flexDirection: 'column',  // corrigido
  alignItems: 'center',     // centraliza horizontalmente
  justifyContent: 'center', // centraliza verticalmente
  backgroundColor: '#fff',
  paddingVertical: 20,
  paddingHorizontal: 10,
  marginBottom: 20,
  width: '48%',
},
iconCard: {
backgroundColor: 'rgb(255, 232, 195)',
padding: 20,
borderRadius: 50
},
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(102, 102, 102)',
     textAlign: 'center', 
  },
  infoText: {
  fontSize: 16,
  color: '#444',
  textAlign: 'center',
  marginBottom: 20,
  paddingHorizontal: 10,
  fontWeight: '500',
  width: '100%',   // <- Adicione isso
},


});
