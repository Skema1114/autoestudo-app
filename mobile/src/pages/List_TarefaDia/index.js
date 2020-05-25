import { View, Image, Text, TouchableOpacity, FlatList, CheckBox, Alert } from 'react-native';
import MaterialFooterM2 from './../../Components/MaterialIconTextButtonsFooter/M1'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';
import moment from 'moment';

export default function ListTarefaDia(){
  const navigation = useNavigation();
  const [tarefaDias, setTarefaDias] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checador, setChecador] = useState(false);
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = 1;
  var essaData = moment().utcOffset('-03:00').format('DD/MM/YYYY')
  var [essaDataShow, setEssaDataShow] = useState(essaData)
  var contadorDia = 0;
  const diaHoje = 23;
  const mesHoje = 5;



  async function _reloadListTarefaDia(){
    await navigation.replace('ListTarefaDia', null, null)
  }


  
  async function editTarefaDia(id_tarefa){
    const status = 'checkado';
    const data = {
        status,
    };

    try{
      const response = await api.patch(`tarefa_dia/${id_tarefa}`, data, {
            headers: {
              Authorization: id_usuario,
            },
        })   
        Alert.alert(
          "Tarefa",
          `Parabéns, tarefa concluída!`,
          [
            { text: "OK", onPress: () => _reloadListTarefaDia() }
          ],
          { cancelable: false }
        );
    }catch(err){
      console.log(err)
    }
  }



  async function loadTarefaDias(dia, mes){
    if(loading){
      return;
    }

    if((total > 0) && (tarefaDias.length === total)){
      return;
    }

    setLoading(true);
    try{
      const response = await api.get(`tarefa_dias/pesquisar/${dia}/${mes}`, {
        headers: {
          Authorization: id_usuario,
          'Content-Type': 'application/json',
        }
      });
      setTarefaDias([...tarefaDias, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setLoading(false);
    }catch(err){
      Alert.alert(
        "Tarefa",
        `Sem tarefas para o dia ${diaHoje}!`);
    }
  }



  useEffect(() => {
    loadTarefaDias(diaHoje, mesHoje);
  }, []);



  function checado(id){
    if(checador===false){
      //alert("Foi checado o "+id)
      editTarefaDia(id);
    }else{
      //alert("Foi deschecado o "+id)
    }
  }



  function _adicionaDia(){
    contadorDia += 1;
    essaData = moment().add(contadorDia, 'd').utcOffset('-03:00').format('DD/MM/YYYY');
    setEssaDataShow(essaData);
    console.log(contadorDia);
    console.log(essaData);
    console.log(essaDataShow);
  }



  function _removeDia(){
    contadorDia -= 1;
    essaData = moment().add(contadorDia, 'd').utcOffset('-03:00').format('DD/MM/YYYY');
    setEssaDataShow(essaData);
    console.log(contadorDia);
    console.log(essaData);
    console.log(essaDataShow);
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

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => _removeDia()}>
          <Text style={styles.actionText}> pra esquerda </Text>
        </TouchableOpacity>

        <Text style={styles.action2}> {essaDataShow} </Text>

        <TouchableOpacity style={styles.action} onPress={() => _adicionaDia()}>
          <Text style={styles.actionText}> pra direita </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefaDias}
        style={styles.incidentList}
        keyExtractor={tarefaDia => String(tarefaDia.id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({item: tarefaDia}) => (
          <View style={styles.actions2}>
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