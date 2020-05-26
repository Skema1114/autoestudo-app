import {View, Image, Text, TouchableOpacity, FlatList, CheckBox, Alert, AsyncStorage} from 'react-native';
import MaterialFooterM2 from './../../Components/MaterialIconTextButtonsFooter/M1';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
  var essaData = moment().utcOffset('-03:00').format('DD/MM/YYYY');
  var essaHora = moment().utcOffset('-03:00').format('HH:mm');
  var [essaDataShow, setEssaDataShow] = useState(essaData);
  const [idUsuario, setIdUsuario] = useState();
  var contadorDia = 0;
  const diaHoje = 23;
  const mesHoje = 5;



  function navigateLogin(){
    navigation.replace('AppLogin', null, null);
  }



  async function _reloadListTarefaDia(){
    await navigation.replace('ListTarefaDia', null, null)
  }



  async function _retrieveToken(storageChave){
    try {
      const value = await AsyncStorage.getItem(storageChave);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("Deu erro no Retrieve")
    }
  };



  function promisseTokenUsuario(){
    var promise = new Promise((resolve, reject) => {
      try{
        const retorno = _retrieveToken('@tokenUsuario');
        resolve(retorno);
      }catch(err){
        reject('Deu erro');
      }
    })

    promise.then(resultado => {
      setIdUsuario(resultado);
      loadTarefaDias(diaHoje, mesHoje, resultado);
    }, erro => {
      console.log('EROOOO = '+erro)
    })
  }


  
  async function _deleteToken(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }



  function logoutAndDeleteToken(){
    Alert.alert("Sair", `Deseja realmente sair?`,
      [
        { text: "VOLTAR", onPress: () => {navigation.replace('ListTarefaDia', null, null)}},
        { text: "OK", onPress: () => {
          _deleteToken('@tokenUsuario')
          .then(resp => navigateLogin())
          .catch(err => console.log('Deu erro no delete token + '+err))
        }},
      ], { cancelable: false });
  }



  async function editTarefaDia(id_tarefa){
    const status = 'sim';
    const data = {
        status,
    };

    try{
      const response = await api.patch(`tarefa_dia/${id_tarefa}`, data, {
            headers: {
              Authorization: idUsuario,
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



  async function loadTarefaDias(dia, mes, id_usuario){
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
          Authorization: parseInt(id_usuario),
          'Content-Type': 'application/json',
        }
      });
      setTarefaDias([...tarefaDias, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setLoading(false);
    }catch(err){
      Alert.alert(
        "Tarefa",
        `Sem tarefas para o dia ${diaHoje}`);
    }
  }



  useEffect(() => {
    promisseTokenUsuario()
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
        <TouchableOpacity onPress={() => logoutAndDeleteToken()}>
          <MaterialCommunityIcons name="logout-variant" size={28} color="#E82041"/>
        </TouchableOpacity>
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