import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function DetailTarefa(){
  const navigation = useNavigation();
  const route = useRoute();
  const tarefa = route.params.tarefa;

  function navigateBack(){
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

        <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ID:</Text>
        <Text style={styles.incidentValue}>{tarefa.id}</Text>

        <Text style={styles.incidentProperty}>ID USUARIO:</Text>
        <Text style={styles.incidentValue}>{tarefa.id_usuario}</Text>

        <Text style={styles.incidentProperty}>NOME:</Text>
        <Text style={styles.incidentValue}>{tarefa.nome}</Text>

        <Text style={styles.incidentProperty}>DATA CRIACAO:</Text>
        <Text style={styles.incidentValue}>{tarefa.data_criacao}</Text>
      </View>

      <View style={styles.contactBox}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {}}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={() => {}}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}