import { Text, Image, View, TouchableOpacity, Alert, Keyboard, AsyncStorage, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import Input from '../../Components/Form/input';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import { Form } from '@unform/mobile';
import api from '../../services/api';
import styles from './styles';
import * as Yup from 'yup';

export default function AppLogin() {
  const formRef = useRef(null);
  const navigation = useNavigation();



  function _reloadTeste() {
    navigation.replace('ListTarefaDia', null, null);
  };



  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório'),
        senha: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      handleLogin(data.email, data.senha);
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

    async function handleLogin(email, senha){     
      const data = {
          email,
          senha,
      };

      try{
        const response = await api.post('sessions', data);
          _deleteData("@MyUId")
          _storeData("@MyUId", response.data.id);
          _reloadTeste();
        }catch(err){
          Alert.alert('Login', 'Occorreu um erro ao efetuar o login, tente novamente.')
      }
    }
  }



  async function _storeData(chave, valor){
    try {
      await AsyncStorage.setItem(chave, valor);
    } catch (err) {
      console.log(err)
    }
  };



  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {
        return value;
      }
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



  function funcaoInutil(){
    _storeData('1e54cc5b');
    navigation.navigate('ListTarefaDia');
  }
 


  return (
  <View style={styles.container}>
    <Form ref={formRef} onSubmit={handleSubmit}>
      <View style={styles.header}>
        <Image source={logoImg}/>
      </View>

      <View style={styles.incident}>
        <Input name="email" label="Email" />
        <Input name="senha" label="Senha" />

        <TouchableOpacity 
          style={styles.action} 
          onPress={() => formRef.current.submitForm()}>
          <Text>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => funcaoInutil()}
        >
          <Text style={styles.detailsButtonText}>Entrar sem cadastro</Text>
          <Feather name="arrow-right" size={16} color="#E02041"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("AppCadastro")}
        >
          <Text style={styles.detailsButtonText}>Criar cadastro</Text>
          <Feather name="arrow-right" size={16} color="#E02041"/>
        </TouchableOpacity>
      </View>
    </Form>
  </View>
  );
}
