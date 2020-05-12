import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function DetailUsuario(){
  const navigation = useNavigation();
  const route = useRoute();
  const usuario = route.params.usuario;
  const message = `Olá ${usuario.name}, estou entrando em contato pois gostaria de ajudar no caso "${usuario.email}" com o valor de`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${usuario.nome}`,
      recipients: [usuario.email],
      body: message
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${usuario.whatsapp}&text=${message}`);
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
      <Text style={styles.incidentProperty}>NOME:</Text>
      <Text style={styles.incidentValue}>{usuario.nome}</Text>

        <Text style={styles.incidentProperty}>EMAIL:</Text>
        <Text style={styles.incidentValue}>{usuario.email}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}