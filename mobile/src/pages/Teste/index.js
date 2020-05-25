import {View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import React, {} from 'react';
import styles from './styles';
import moment from 'moment';

export default function Teste(){
const navigation = useNavigation();
const id_usuario = 1;


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}></Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>

      <View style={styles.incident}>
        <View>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => {}}
            >
              <Text style={styles.detailsButtonText}>List Mes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
