import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListMes(){
  const navigation = useNavigation();
  const [meses, setMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';

  function navigateToMes(mes){
    navigation.navigate('DetailMes', {mes});
  }

  async function loadMeses(){
    if(loading){
      return;
    }

    if((total > 0) && (meses.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('meses', {
      headers: {
        Authorization: '1e54cc5b',
      }
    });

    setMeses([...meses, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadMeses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Meses
      </Text>

      <FlatList
        data={meses}
        style={styles.incidentList}
        keyExtractor={mes => String(mes.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMeses}
        onEndReachedThreshold={0.2}
        renderItem={({item: mes}) => (
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

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToMes(mes)}
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