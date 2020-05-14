import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function ListTarefaDia(){
  const navigation = useNavigation();
  const [tarefaDias, setTarefaDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1e54cc5b';

  function navigateToTarefaDias(tarefaDia){
    navigation.navigate('DetailTarefaDia', {tarefaDia});
  }

  async function loadTarefaDias(){
    if(loading){
      return;
    }

    if((total > 0) && (tarefaDias.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('tarefa_dias', {
      headers: {
        Authorization: '1e54cc5b',
      }
    });

    setTarefaDias([...tarefaDias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadTarefaDias();
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
      <Text style={styles.description}>Tarefa Dia
      </Text>

      <FlatList
        data={tarefaDias}
        style={styles.incidentList}
        keyExtractor={tarefaDia => String(tarefaDia.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadTarefaDias}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaDia}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{tarefaDia.id}</Text>

            <Text style={styles.incidentProperty}>ID TAREFA:</Text>
            <Text style={styles.incidentValue}>{tarefaDia.id_tarefa}</Text>

            <Text style={styles.incidentProperty}>ID USUARIO:</Text>
            <Text style={styles.incidentValue}>{tarefaDia.id_usuario}</Text>

            <Text style={styles.incidentProperty}>STATUS:</Text>
            <Text style={styles.incidentValue}>{tarefaDia.status}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
             onPress={() => navigateToTarefaDias(tarefaDia)}
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