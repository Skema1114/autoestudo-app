import {View, Image, Text, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import MaterialFooterM1 from './../../Components/MaterialIconTextButtonsFooter/M4'
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

export default function ListResultadoDia(){
  const navigation = useNavigation();
  const [resultadoDias, setResultadoDias] = useState([]);
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
    funcaoTeste();
  }, []);



  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg}/>
          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
          </Text>
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