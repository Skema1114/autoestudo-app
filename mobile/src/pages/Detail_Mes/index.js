import React from './node_modules/react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {Feather} from './node_modules/@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation, useRoute} from './node_modules/@react-navigation/native';
import * as MailComposer from './node_modules/expo-mail-composer';

export default function DetailMes(){
  const navigation = useNavigation();
  const route = useRoute();
  const mes = route.params.mes;
  //const mesmes${mes.name}, estou entrando em contato pois gostaria de ajudar no caso "${mes.email}" com o valor de`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendMail(){
   // MailComposer.composeAsync({
     // subject: `Herói do caso: ${mes.nome}`,
    //  recipients: [mes.email],
   //   body: message
// })
  }

  function sendWhatsapp(){
   // Linking.openURL(`whatsapp://send?phone=${mes.whatsapp}&text=${message}`);
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
        <Text style={styles.incidentValue}>{mes.id}</Text>

        <Text style={styles.incidentProperty}>ID USUARIO:</Text>
        <Text style={styles.incidentValue}>{mes.id_usuario}</Text>

        <Text style={styles.incidentProperty}>MES:</Text>
        <Text style={styles.incidentValue}>{mes.mes}</Text>

        <Text style={styles.incidentProperty}>ANO:</Text>
        <Text style={styles.incidentValue}>{mes.ano}</Text>

        <Text style={styles.incidentProperty}>QTD NAO:</Text>
        <Text style={styles.incidentValue}>{mes.qtd_nao}</Text>
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