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


 // #######################################################################

                      var tarefasMes = [];

                      var date = new Date();
                      var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
                      var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);


                      var agora = moment();
                      var finalMes = moment().endOf('month').set({
                          'hour' : agora.get('hour'),
                          'minute' : agora.get('minute'),
                          'second' : agora.get('second'),
                          'millisecond' : agora.get('millisecond')
                      });
                      //console.log(finalMes.format('DD'));
                      //console.log(finalMes.format('MM'))
                      var inicioMes = moment().startOf('month').set({
                        'hour' : agora.get('hour'),
                        'minute' : agora.get('minute'),
                        'second' : agora.get('second'),
                        'millisecond' : agora.get('millisecond')
                      });
                      //console.log(inicioMes.format('DD'));
                      //console.log(inicioMes.format('MM'))


                      function sla(){
                        for (let dia = 1; dia <= finalMes.format('DD'); dia++) {
                          //console.log('DIA = '+dia+' | MES = '+finalMes.format('MM'));
                          addTarefasMes(dia);
                        }

                        for(let teste = 0; teste <= tarefasMes.length; teste++){
                          console.log(tarefasMes);
                          handleNewDia()
                          
                        }
                      }

                      async function handleNewDia(id_mes){
                        const data_cadastro = moment().utcOffset('-03:00').format("LLL");
                        
                        const data = {
                            id_mes,
                            data_cadastro,
                        };
                        try{
                          const response = await api.post('dia', data, {
                                headers: {
                                    Authorization: id_usuario,
                                }
                            })   
                            Alert.alert(
                              "Cadastro",
                              `Dia cadastrado com sucesso!`,
                              [
                                { text: "OK", onPress: () => _reloadListTarefaMes() }
                              ],
                              { cancelable: false }
                            );
                        }catch(err){
                          console.log(err)
                            Alert.alert('Cadastro', 'Erro ao cadastrar, tente novamente.');
                        }
                      }
  // /////////////////////////////////////////////                    

  async function handleEditTarefaDia(id_tarefa){
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

  async function _reloadListTarefaDia(){
    await navigation.replace('ListTarefaDia', null, null)
  }

  
// ##########################################################################

  function addTarefasMes(dia){
    tarefasMes.push(dia);
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
        Authorization: id_usuario,
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
      //alert("Foi checado o "+id)
      handleEditTarefaDia(id);
    }else{
      //alert("Foi deschecado o "+id)
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

      <TouchableOpacity style={styles.action} onPress={() => sla()}>
        <Text style={styles.actionText}>Cadastrar</Text>
      </TouchableOpacity>

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