import { Text, Image, View, TouchableOpacity, Alert, Keyboard, FlatList, CheckBox } from 'react-native';
import MaterialFooterM3 from '../../Components/MaterialIconTextButtonsFooter/M3'
import React, { useRef, useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../../Components/Form/input';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import { Form } from '@unform/mobile';
import api from '../../services/api';
import styles from './styles';
import moment from 'moment';
import * as Yup from 'yup';

export default function NewTarefaMes() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const id_usuario = '1';
  var tarefasMes = [];
  var idsDiasCadastrados = [];

  var date = new Date();
  var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
  var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var agora = moment().utcOffset('-03:00');
  var finalMes = moment().utcOffset('-03:00').endOf('month').set({
      'hour' : agora.get('hour'),
      'minute' : agora.get('minute'),
      'second' : agora.get('second'),
      'millisecond' : agora.get('millisecond')
  });
  //console.log(finalMes.format('DD'));
  //console.log(finalMes.format('MM'))
  var inicioMes = moment().utcOffset('-03:00').startOf('month').set({
    'hour' : agora.get('hour'),
    'minute' : agora.get('minute'),
    'second' : agora.get('second'),
    'millisecond' : agora.get('millisecond')
  });
  //console.log(inicioMes.format('DD'));
  //console.log(inicioMes.format('MM'))
  
  
  
  function addIdTarefasMes(dia){
    tarefasMes.push(dia);
  }



  function addIdDiasCadastrados(id){
    console.log('id dia recebido '+id)
    idsDiasCadastrados.push(id);
  }



  function _reloadNewTarefa2() {
    navigation.replace( 'NewTarefa2', null, null );
  };



  function addIdTarefasMes(id){
    tarefasMes.push(id);
  }
  


  function navigateBack(){
    navigation.goBack();
  }



  function _reloadListTarefaMes(){
    navigation.replace('ListTarefaMes', null, null);
  }



  async function submit(data, { reset }) {
      const agora = moment().utcOffset('-03:00');
      const mes = agora.format('M');
      const ano = agora.format('YYYY');
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");


    try{
      const schema = Yup.object().shape({
        qtd_nao: Yup.number("Precisa ser um número válido").required('A quantidade é obrigatória'),
      })
      await schema.validate(data, {
        abortEarly: false,
      });

      try{
        for(let i = 0; i < tarefasMes.length; i++){
          await newTarefaMes(tarefasMes[i], mes, ano, data.qtd_nao);
        }
        try{
          for(let dia = 1; dia <= finalMes.format('DD'); dia++) {
            for(let i = 0; i < tarefasMes.length; i++){
              await newTarefaDia(tarefasMes[i], dia, mes);
            }
          }
        }catch(err){
          console.log('DEU ERRO NO TRY DO NEW TAREFA DIA')
        }
      }catch(err){
        console.log('DEU ERRO NO TRY DO NEW TAREFA MES')
      }
      
      
      /*
      try{
        // CADASTRA O MES
        await newMes(data.qtd_nao);
        
        try{
          // CADASTRA AS TAREFAS NO MES
          for(let i = 0; i < tarefasMes.length; i++){
            await newTarefaMes(idMesCadastrado, tarefasMes[i]);
          }

          try{
            // CADASTRA TODOS OS DIAS DO MES
            for(let dia = 1; dia <= finalMes.format('DD'); dia++) {
              await newDia(idMesCadastrado, dia)
                .then(resp => addIdDiasCadastrados(resp.data.id))
            }

            console.log(idsDiasCadastrados);

          }catch(err){
            // CATCH DO CADASTRO DO DIA
            console.log('deu erro no try do new dia')
          }
        }catch(err){
          // CATCH DO CADASTRO DA TAREFA DO MES
          console.log('deu erro no try do new tarefa mes')
        }
      }catch(err){
        // CATCH DO CADASTRO DO MES
        console.log('deu erro no try do new mes')
      }
      */
      Keyboard.dismiss();
      reset();

    }catch(err){
      // CATCH DO SUBMIT
      if(err instanceof Yup.ValidationError){
          const errorMessage = {};
          err.inner.forEach(error => {
            errorMessage[error.path] = error.message;
          });
          formRef.current.setErrors(errorMessage);
      }
    }

    async function newTarefaMes(id_tarefa, mes, ano, qtd_nao){
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");

      const data = {
        id_tarefa,
        mes,
        ano,
        qtd_nao,
        data_cadastro,
      };
      try{
        const response = await api.post('tarefa_mes', data, {
              headers: {
                  Authorization: id_usuario,
                  'Content-Type': 'application/json',
              }
          })   
          Alert.alert(
            "Cadastro",
            `Mês cadastrado com sucesso!`,
            [
              { text: "OK", onPress: () => _reloadListTarefaMes() }
            ],
            { cancelable: false }
          );
      }catch(err){
        Alert.alert('Cadastro', 'Ocorreu um erro inesperado (newTarefaMes), tente novamente.')
      }
    }

    async function newTarefaDia(id_tarefa, dia, mes){
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");
      const status = 'aguardando';

      const data = {
        id_tarefa,
        dia,
        mes,
        status,
        data_cadastro,
      };
      try{
        const response = await api.post('tarefa_dia', data, {
              headers: {
                  Authorization: id_usuario,
                  'Content-Type': 'application/json',
              }
          })   
          console.log('Tarefas do dia cadastrado com sucesso')
      }catch(err){
        Alert.alert('Cadastro', 'Ocorreu um erro inesperado (newTarefaDia), tente novamente')
      }
    }
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
        Authorization: id_usuario,
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
  <View style={styles.container}>
    <Form ref={formRef} onSubmit={submit}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <MaterialFooterM3></MaterialFooterM3>
        
      <View style={styles.incident}>
      
        <Input name="qtd_nao" label="Quantidade de não" />

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.action} 
            onPress={() => formRef.current.submitForm()}>
            <Text style={styles.actionText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.action} 
            onPress={() => _reloadNewTarefa2()}>
            <Text style={styles.actionText}>Nova tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          style={styles.incidentProperty2}
          data={tarefas}
          keyExtractor={tarefa => String(tarefa.id)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          renderItem={({item: tarefa}) => (
          
          <View style={styles.actions2}>
            <CheckBox
              style={styles.incidentProperty}
              onChange={() => addIdTarefasMes(tarefa.id)}>
            </CheckBox>
            <Text style={styles.incidentProperty}>{tarefa.nome}</Text>
          </View>
          )}
        />
      </View>
  </Form>
  </View>
  );
}
