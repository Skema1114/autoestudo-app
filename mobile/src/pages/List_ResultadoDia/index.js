import {View, Image, Text, TouchableOpacity, FlatList, AsyncStorage, Alert} from 'react-native';
import MaterialFooterM1 from './../../Components/MaterialIconTextButtonsFooter/M4';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';

export default function ListResultadoDia(){
  const [resultadoDias, setResultadoDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();



  async function _retrieveToken(storageChave){
    try {
      const value = await AsyncStorage.getItem(storageChave);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("Deu erro no Retrieve")
    }
  };



  async function _deleteToken(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }



  function logoutAndDeleteToken(){
    Alert.alert("Sair", `Deseja realmente sair?`,
      [
        { text: "VOLTAR", onPress: () => {navigation.replace('ListResultadoDia', null, null)}},
        { text: "OK", onPress: () => {
          _deleteToken('@tokenUsuario')
          .then(resp => navigation.replace('AppLogin', null, null))
          .catch(err => console.log('Deu erro no delete token + '+err))
        }},
      ], { cancelable: false }
    );
  }



  function promisseTokenUsuario(){
    var promise = new Promise((resolve, reject) => {
      try{
        const retorno = _retrieveToken('@tokenUsuario');
        resolve(retorno);
      }catch(err){
        reject('Deu erro');
      }
    })

    promise.then(resultado => {
      loadResultadoDias(resultado)
    }, erro => {
      console.log('EROOOO = '+erro)
    })
  }



  async function loadResultadoDias(id_usuario){
    if(loading){
      return;
    }

    if((total > 0) && (resultadoDias.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('resultado_dias', {
      headers: {
        Authorization: id_usuario,
      }
    });

    setResultadoDias([...resultadoDias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }



  useEffect(() => {
    promisseTokenUsuario();
  }, []);



  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg}/>
          <TouchableOpacity onPress={() => logoutAndDeleteToken()}>
            <MaterialCommunityIcons name="logout-variant" size={28} color="#E82041"/>
          </TouchableOpacity>
        </View>

        <MaterialFooterM1></MaterialFooterM1>

        <FlatList
          data={resultadoDias}
          style={styles.incidentList}
          keyExtractor={resultadoDia => String(resultadoDia.id)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          renderItem={({item: resultadoDia}) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ID:</Text>
              <Text style={styles.incidentValue}>{resultadoDia.id}</Text>

              <Text style={styles.incidentProperty}>ID DIA:</Text>
              <Text style={styles.incidentValue}>{resultadoDia.id_dia}</Text>

              <Text style={styles.incidentProperty}>ID USUARIO:</Text>
              <Text style={styles.incidentValue}>{resultadoDia.id_usuario}</Text>

              <Text style={styles.incidentProperty}>RESULTADO:</Text>
              <Text style={styles.incidentValue}>{resultadoDia.resultado}</Text>

              <Text style={styles.incidentProperty}>QTD NAO:</Text>
              <Text style={styles.incidentValue}>{resultadoDia.qtd_nao}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}