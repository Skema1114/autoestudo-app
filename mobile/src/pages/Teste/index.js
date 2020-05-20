import React, {} from 'react';
import {View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import MaterialBasicFooter from './../../Components/MaterialBasicFooter';
import MaterialIconTextButtonsFooter from './../../Components/MaterialIconTextButtonsFooter';

export default function Teste(){
  const navigation = useNavigation();
  const id_usuario = _retrieveData('UsuarioIdStorage');

  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  async function _deleteData(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  function navigateToTela(tela){
    switch(tela){

      case 2:
        navigation.navigate('ListMes');
      break;

      case 4:
        navigation.navigate('ListTarefa');
      break;

      case 5:
        navigation.navigate('ListTarefaDia');
      break;

      case 10:
        navigation.navigate('ListTarefaMes');
      break;
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}></Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o 
        dia.
      </Text>

      <View style={styles.incident}>
        <View>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(2)}
            >
              <Text style={styles.detailsButtonText}>List Mes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(4)}
            >
              <Text style={styles.detailsButtonText}>List Tarefa</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(5)}
            >
              <Text style={styles.detailsButtonText}>List Tarefa Dia</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(10)}
            >
              <Text style={styles.detailsButtonText}>List Tarefa Mes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
            <View style={styles.container}>
      
            

        </View>
        </View>
      </View>
      <MaterialIconTextButtonsFooter></MaterialIconTextButtonsFooter>
    </View>
  );
}