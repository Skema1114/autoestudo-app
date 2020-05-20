import React, {useEffect, useState, useImperativeHandle} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import MaterialFooterM3 from './../../Components/MaterialIconTextButtonsFooter/M3'

export default function ListTarefaMes(){
  const navigation = useNavigation();
  const [tarefaMeses, setTarefaMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = '1e54cc5b';

  function navigateToNew(){
    navigation.navigate('NewMes');
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
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <MaterialFooterM3></MaterialFooterM3>

      <View style={styles.contactBox}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {navigateToNew()}}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={tarefaMeses}
        style={styles.incidentProperty2}
        keyExtractor={tarefaMes => String(tarefaMes.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaMes}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>TAREFA NOME:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}