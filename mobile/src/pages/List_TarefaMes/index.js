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
  const id_usuario = '1e54cc5b';

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

      <Text style={styles.title}>Tarefa Mes</Text>

      <FlatList
        data={tarefaMeses}
        style={styles.incidentList}
        keyExtractor={tarefaMes => String(tarefaMes.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaMes}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ID:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.id}</Text>

            <Text style={styles.incidentProperty}>ID MES:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.id_mes}</Text>

            <Text style={styles.incidentProperty}>ID TAREFA:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.id_tarefa}</Text>

            <Text style={styles.incidentProperty}>ID USUARIO:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.id_usuario}</Text>

            <Text style={styles.incidentProperty}>DATA:</Text>
            <Text style={styles.incidentValue}>{tarefaMes.data}</Text>

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