import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, AsyncStorage, FlatList, CheckBox} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import MaterialFooterM1 from './../../Components/MaterialIconTextButtonsFooter/M1'

export default function ListTarefa(){
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';


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

        <View style={styles.contactBox}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={() => {navigateToNew()}}>
              <Text style={styles.actionText}>Nova tarefa</Text>
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

              <Text style={styles.incidentProperty}>{tarefa.nome}</Text>
              <Text style={styles.incidentProperty2}>{tarefa.data_criacao}</Text>

            </View>
          )}
        />
      </View>
    </View>
  );
}