import React, {} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function Teste(){
  const navigation = useNavigation();

  function navigateToTela(tela){
    switch(tela){
      case 1:
        navigation.navigate('ListUsuario');
      break;

      case 2:
        navigation.navigate('ListMes');
      break;
          
      case 3:
        navigation.navigate('ListDia');
      break;

      case 4:
        navigation.navigate('ListTarefa');
      break;

      case 5:
        navigation.navigate('ListTarefaDia');
      break;

      case 6:
        navigation.navigate('ListResultadoDia');
      break;

      case 7:
        navigation.navigate('ListResultadoMes');
      break;

      case 8:
        navigation.navigate('AppLogin');
      break;

      case 9:
        navigation.navigate('AppCadastro');
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
             onPress={() => navigateToTela(1)}
            >
              <Text style={styles.detailsButtonText}>List Usuario</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(2)}
            >
              <Text style={styles.detailsButtonText}>List Mes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(3)}
            >
              <Text style={styles.detailsButtonText}>List Dia</Text>
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
             onPress={() => navigateToTela(6)}
            >
              <Text style={styles.detailsButtonText}>List Resultado Dia</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(7)}
            >
              <Text style={styles.detailsButtonText}>List Resultado Mes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(8)}
            >
              <Text style={styles.detailsButtonText}>Login</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTela(9)}
            >
              <Text style={styles.detailsButtonText}>Cadastro</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}