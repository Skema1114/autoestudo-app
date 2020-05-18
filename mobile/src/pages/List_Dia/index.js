import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListDia(){
  const navigation = useNavigation();
  const [dias, setDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';

  function navigateToDias(dia){
    navigation.navigate('DetailDia', {dia});
  }

  async function loadDias(){
    if(loading){
      return;
    }

    if((total > 0) && (dias.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('dias', {
      headers: {
        Authorization: id_usuario.toString(),
      }
    });

    setDias([...dias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadDias();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Dia</Text>

      <FlatList
        data={dias}
        style={styles.incidentList}
        keyExtractor={dia => String(dia.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: dia}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{dia.id}</Text>

            <Text style={styles.incidentProperty}>ID USUARIO:</Text>
            <Text style={styles.incidentValue}>{dia.id_usuario}</Text>

            <Text style={styles.incidentProperty}>ID MES:</Text>
            <Text style={styles.incidentValue}>{dia.id_mes}</Text>

            <Text style={styles.incidentProperty}>DATA CADASTRO:</Text>
            <Text style={styles.incidentValue}>{dia.data_cadastro}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToDias(dia)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}