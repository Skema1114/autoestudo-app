import {Text, Image, View, TouchableOpacity, Alert, Keyboard, AsyncStorage} from 'react-native';
import MaterialFooterM3 from './../../Components/MaterialIconTextButtonsFooter/M3'
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import Input from '../../Components/Form/input';
import logoImg from '../../assets/logo.png';
import {Form} from '@unform/mobile';
import api from '../../services/api';
import styles from './styles';
import moment from 'moment';
import * as Yup from 'yup';

export default function NewTarefa2() {
  const [idUsuario, setIdUsuario] = useState();
  const navigation = useNavigation();
  const formRef = useRef(null);


  
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
    }, erro => {
      console.log('EROOOO = '+erro)
    })
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
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");
     
      const data = {
          nome,
          data_cadastro,
      };

      try{
        const response = await api.post('tarefa', data, {
              headers: {
                  Authorization: idUsuario,
                  'Content-Type': 'application/json',
              }
          })
          
          Alert.alert("Cadastro", `ID da tarefa cadastrada: ${response.data.id}`,
            [
              { text: "Nova tarefa", onPress: () => navigation.replace( 'NewTarefa2', null, null )},
              { text: "OK", onPress: () => navigation.replace( 'NewTarefaMes', null, null )}
            ], { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Erro ao cadastrar caso, tente novamente.')
      }
    }
  }


 
  useEffect(() => {
    promisseTokenUsuario();
  }, []);



  return (
  <View style={styles.container}>
    <Form ref={formRef} onSubmit={handleSubmit}>
      <View style={styles.header}>
        <Image source={logoImg}/>
      </View>

      <MaterialFooterM3></MaterialFooterM3>

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
