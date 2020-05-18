import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { Text, Image, View, TouchableOpacity, Alert, Keyboard } from 'react-native';
import Input from '../../Components/Form/input';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import api from '../../services/api';

export default function NewTarefa2() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const id_usuario = '1e54cc5b';

  function navigateBack(){
    navigation.goBack();
  }

  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      handleNewTarefa(data.nome);
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

    async function handleNewTarefa(nome){
      const data_criacao =new Date().getDate().toString();
     
      const data = {
          nome,
          data_criacao,
      };

      try{
        const response = await api.post('tarefa', data, {
              headers: {
                  Authorization: id_usuario.toString(),
              }
          })
          
          Alert.alert(
            "Cadastro",
            `ID da tarefa cadastrada: ${response.data.id}`,
            [
              { text: "Nova tarefa", onPress: () => _reloadNewTarefa() },
              { text: "OK", onPress: () => _reloadNewMes() }
            ],
            { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Erro ao cadastrar caso, tente novamente.')
      }
    }
  }

  function _reloadNewMes() {
    navigation.replace( 'NewMes', null, null );
  };

  function _reloadNewTarefa() {
    navigation.replace( 'NewTarefa', null, null );
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
      
      <Input name="nome" label="Nome" />

      <TouchableOpacity 
        style={styles.action} 
        onPress={() => formRef.current.submitForm()}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  </Form>
</View>
);
}
