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
import moment from 'moment';

export default function NewMes() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [meses, setMeses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //const id_usuario = _retrieveData('UsuarioIdStorage');
  const id_usuario = '1e54cc5b';
  var tarefasMes = [];
  var idMesCadastrado = 0;

  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

  async function _deleteData(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {}
    } catch (err) {
      console.log(err);
    }
  }

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

      try{
       
        await handleNewMes(data.qtd_nao);
     
        for(let i = 0; i < tarefasMes.length; i++){
          await handleNewTarefaMes(idMesCadastrado, tarefasMes[i]);
        }
        
      }catch(err){
          console.log(err)
      }

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
  
          idMesCadastrado = response.data.id;
      }catch(err){
        Alert.alert('Cadastro', 'Erro ao cadastrar, tente novamente.')
      }
    }

    async function handleNewTarefaMes(id_mes, id_tarefa){
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");
     
      const data = {
          id_mes,
          id_tarefa,
          data_cadastro,
      };

      try{
        const response = await api.post('tarefa_mes', data, {
              headers: {
                  Authorization: id_usuario.toString(),
              }
          })
          
          console.log("Tarefa mes cadastrada com sucesso");
      }catch(err){
        console.log(err)
          Alert.alert('Cadastro', 'Erro ao cadastrar, tente novamente.');
      }
    }
  }

  function _reloadNewTarefa2() {
    navigation.replace( 'NewTarefa2', null, null );
  };

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
