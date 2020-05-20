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
import moment from 'moment';
import MaterialFooterM1 from './../../Components/MaterialIconTextButtonsFooter/M1'

export default function NewTarefa() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  //const id_usuario = _retrieveData('UsuarioIdStorage');
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
      const data_criacao = moment().utcOffset('-03:00').format("LLL");
     
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
              { text: "OK", onPress: () => _reloadListTarefa() }
            ],
            { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Erro ao cadastrar caso, tente novamente.')
      }
    }
  }

  function _reloadListTarefa() {
    navigation.replace( 'ListTarefa', null, null );
  };

  function _reloadNewTarefa() {
    navigation.replace( 'NewTarefa', null, null );
  };
 
  return (
  <View style={styles.container}>
  <Form ref={formRef} onSubmit={handleSubmit}>
    <View style={styles.header}>
      <Image source={logoImg}/>

      <TouchableOpacity onPress={navigateBack}>
        <Feather name="arrow-left" size={28} color="#E82041"/>
      </TouchableOpacity>
    </View>

    <MaterialFooterM1></MaterialFooterM1>

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
