import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListResultadoDia(){
  const navigation = useNavigation();
  const [resultadoDias, setResultadoDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';


  function navigateBack(){
    navigation.goBack();
  }

  async function loadResultadoDias(){
    if(loading){
      return;
    }

    if((total > 0) && (resultadoDias.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('resultado_dias', {
      headers: {
        Authorization: id_usuario.toString(),
      }
    });

    setResultadoDias([...resultadoDias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }

  useEffect(() => {
    loadResultadoDias();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Resultado Dia</Text>

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
  );
}