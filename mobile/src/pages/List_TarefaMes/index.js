import React, {useEffect, useState, useImperativeHandle} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListTarefaMes(){
  const navigation = useNavigation();
  const [tarefaMeses, setTarefaMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = '1e54cc5b';

  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  function navigateBack(){
    navigation.goBack();
  }

  async function _deleteData(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  function navigateToTarefaDias(tarefaMes){
    navigation.navigate('DetailTarefaDia', {tarefaMes});
  }

  async function loadTarefaMeses(){
    if(loading){
      return;
    }

    if((total > 0) && (tarefaMeses.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('tarefa_meses', {
      headers: {
        Authorization: id_usuario.toString(),
      }
    });

    setTarefaMeses([...tarefaMeses, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }

  useEffect(() => {
    loadTarefaMeses();
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

      <Text style={styles.title}>Tarefa Mes</Text>

      <FlatList
        data={tarefaMeses}
        style={styles.incidentList}
        keyExtractor={tarefaMes => String(tarefaMes.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaMes}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>TAREFA NOME:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.nome}</Text>

            <Text style={styles.incidentProperty}>TAREFA MES:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.mes}</Text>

            <Text style={styles.incidentProperty}>TAREFA ANO:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.ano}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTarefaDias(tarefaMes)}
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