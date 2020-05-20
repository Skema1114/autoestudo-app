import React, { useEffect, useState, useImperativeHandle } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import MaterialFooterM2 from './../../Components/MaterialIconTextButtonsFooter/M2'

export default function ListTarefaDia(){
  const navigation = useNavigation();
  const [tarefaDias, setTarefaDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checador, setChecador] = useState(false);
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = '1e54cc5b';


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
        Authorization: id_usuario.toString(),
      }
    });

    setTarefaDias([...tarefaDias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
  }

  useEffect(() => {
    loadTarefaDias();
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
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <MaterialFooterM2></MaterialFooterM2>

      <FlatList
        data={tarefaDias}
        style={styles.incidentList}
        keyExtractor={tarefaDia => String(tarefaDia.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaDia}) => (
          <View style={styles.incident}>
            <CheckBox
            style={styles.incidentProperty}
              value={checador} id={tarefaDia.id} onChange={() => checado(tarefaDia.id)}>
            </CheckBox>

            <Text style={styles.incidentProperty}>{tarefaDia.nome} ({tarefaDia.status})</Text>
          </View>
        )}
      />
    </View>
  );
}