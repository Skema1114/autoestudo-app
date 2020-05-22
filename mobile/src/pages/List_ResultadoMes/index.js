import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListResultadoMes(){
  const navigation = useNavigation();
  const [resultadoMeses, setResultadoMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';
  

  function navigateBack(){
    navigation.goBack();
  }

  async function loadResultadoMes(){
    if(loading){
      return;
    }

    if((total > 0) && (resultadoMeses.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('resultado_meses', {
      headers: {
        Authorization: id_usuario.toString(),
      }
    });

    setResultadoMeses([...resultadoMeses, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }

  useEffect(() => {
    loadResultadoMes();
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