import {View, Image, Text, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

export default function ListResultadoMes(){
  const navigation = useNavigation();
  const [resultadoMeses, setResultadoMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
 


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



  function funcaoTeste(){
    var promise = new Promise((resolve, reject) => {
      try{
        const retorno = _retrieveToken('@tokenUsuario');
        resolve(retorno);
      }catch(err){
        reject('Deu erro');
      }
    })

    promise.then(resultado => {
      loadResultadoMes(resultado)
    }, erro => {
      console.log('EROOOO = '+erro)
    })
  }



  async function loadResultadoMes(id_usuario){
    if(loading){
      return;
    }

    if((total > 0) && (resultadoMeses.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('resultado_meses', {
      headers: {
        Authorization: id_usuario,
      }
    });

    setResultadoMeses([...resultadoMeses, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }



  useEffect(() => {
    funcaoTeste();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Resultado Mes</Text>

      <FlatList
        data={resultadoMeses}
        style={styles.incidentList}
        keyExtractor={resultadoMes => String(resultadoMes.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: resultadoMes}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{resultadoMes.id}</Text>

            <Text style={styles.incidentProperty}>ID MES:</Text>
            <Text style={styles.incidentValue}>{resultadoMes.id_mes}</Text>

            <Text style={styles.incidentProperty}>ID USUARIO:</Text>
            <Text style={styles.incidentValue}>{resultadoMes.id_usuario}</Text>

            <Text style={styles.incidentProperty}>RESULTADO:</Text>
            <Text style={styles.incidentValue}>{resultadoMes.resultado}</Text>
          </View>
        )}
      />
    </View>
  );
}