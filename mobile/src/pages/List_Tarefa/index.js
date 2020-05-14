import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListTarefa(){
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';

  function navigateToDetail(tarefa){
    navigation.navigate('DetailTarefa', {tarefa});
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
        Authorization: '1e54cc5b',
      }
    });

    setTarefas([...tarefas, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadTarefas();
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
      <Text style={styles.description}>Tarefas
      </Text>

      <FlatList
        data={tarefas}
        style={styles.incidentList}
        keyExtractor={tarefa => String(tarefa.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadTarefas}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefa}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{tarefa.id}</Text>

            <Text style={styles.incidentProperty}>ID USUARIO:</Text>
            <Text style={styles.incidentValue}>{tarefa.id_usuario}</Text>

            <Text style={styles.incidentProperty}>NOME:</Text>
            <Text style={styles.incidentValue}>{tarefa.nome}</Text>

            <Text style={styles.incidentProperty}>DATA CRIACAO:</Text>
            <Text style={styles.incidentValue}>{tarefa.data_criacao}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToDetail(tarefa)}
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