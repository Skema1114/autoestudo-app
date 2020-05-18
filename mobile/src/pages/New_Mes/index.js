import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/mobile';
import { Text, Image, View, TouchableOpacity, Alert, Keyboard, FlatList, CheckBox } from 'react-native';
import Input from '../../Components/Form/input';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import api from '../../services/api';

export default function NewMes() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const id_usuario = '1e54cc5b';
  const [tarefas, setTarefas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  var tarefasMes = [];

  function navigateBack(){
    navigation.goBack();
  }

  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        qtd_nao: Yup.number("Precisa ser um número válido").required('A quantidade é obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      handleNewMes(data.qtd_nao);
      Keyboard.dismiss();
      reset();

    }catch(err){
      if(err instanceof Yup.ValidationError){
          const errorMessage = {};

          err.inner.forEach(error => {
            errorMessage[error.path] = error.message;
          });

          formRef.current.setErrors(errorMessage);
      }
    }

    async function handleNewMes(qtd_nao){
      var mes = new Date().getMonth();
      mes = mes + 1
      mes = mes.toString()
      const ano = new Date().getFullYear().toString();
     
      const data = {
          mes,
          ano,
          qtd_nao,
      };

      try{
        const response = await api.post('mes', data, {
              headers: {
                  Authorization: id_usuario.toString(),
              }
          })
          
          Alert.alert(
            "Cadastro",
            `ID do mes cadastrada: ${response.data.id}`,
            [
              { text: "OK", onPress: () => _reloadListMes() }
            ],
            { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Erro ao cadastrar, tente novamente.')
      }
    }
  }

  function _reloadListMes() {
    navigation.replace( 'ListMes', null, null );
  };

  function _reloadNewTarefa2() {
    navigation.replace( 'NewTarefa2', null, null );
  };

  // PARA O EDITAR
  /*
  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        nome: 'Rafael',
        email: 'skema1114@hotmail.com',
        senha: '123456'
      })
    }, 2000)
  }, []);
  */

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

  function addTarefasMes(id){
    tarefasMes.push(id);
    //console.log(tarefasMes);

    for(let i = 0; i < tarefasMes.length; i++){
      console.log(tarefasMes[i]);
      
      if(tarefasMes[i] == 2){
        console.log('é dois');
      }
    }
  }
 
  return (
  <View style={styles.container}>
  <Form ref={formRef} onSubmit={handleSubmit}>
    <View style={styles.header}>
      <Image source={logoImg}/>

      <TouchableOpacity onPress={navigateBack}>
        <Feather name="arrow-left" size={28} color="#E82041"/>
      </TouchableOpacity>
    </View>
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
          data={tarefas}
          keyExtractor={tarefa => String(tarefa.id)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          renderItem={({item: tarefa}) => (
            <View>

              <CheckBox
                onChange={() => addTarefasMes(tarefa.id)}>
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
