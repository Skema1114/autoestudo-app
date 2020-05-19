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
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = '1e54cc5b';

  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {
        return value;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _deleteData(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  function navigateBack(){
    navigation.goBack();
  }

  function navigateToMes(mes){
    navigation.navigate('DetailMes', {mes});
  }

  function navigateToNew(){
    navigation.navigate('NewMes');
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
        Authorization: id_usuario.toString(),
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
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Mes</Text>

      <View style={styles.contactBox}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {navigateToNew()}}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={meses}
        style={styles.incidentList}
        keyExtractor={mes => String(mes.id)}
        showsVerticalScrollIndicator={false}
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