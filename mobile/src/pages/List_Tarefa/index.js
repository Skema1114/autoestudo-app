import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, AsyncStorage, FlatList, CheckBox} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListTarefa(){
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checador, setChecador] = useState(false);
  const id_usuario = _retrieveData('UsuarioIdStorage');

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

  function navigateToDetail(tarefa){
    navigation.navigate('DetailTarefa', {tarefa});
  }

  function navigateToNew(){
    navigation.navigate('NewTarefa');
  }

  async function loadTarefas(){
    if(loading){
      return;
    }

    if((total > 0) && (tarefas.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('tarefas', {
      headers: {
        Authorization: id_usuario.toString(),
      }
    });

    setTarefas([...tarefas, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }

  useEffect(() => {
    loadTarefas();
  }, []);

  function checado(id){
    if(checador===false){
      alert("Foi checado o "+id)
      setChecador(true)
    }else{
      alert("Foi deschecado o "+id)
      setChecador(false)
    }
  }

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

      <Text style={styles.title}>Tarefa</Text>

      <View style={styles.contactBox}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {navigateToNew()}}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tarefas}
        style={styles.incidentList}
        keyExtractor={tarefa => String(tarefa.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefa}) => (
          <View style={styles.incident}>

            <CheckBox
              value={checador} id={tarefa.id} onChange={() => checado(tarefa.id)}>
            </CheckBox>

            <Text style={styles.incidentProperty}>{tarefa.nome}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(tarefa)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-left" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}