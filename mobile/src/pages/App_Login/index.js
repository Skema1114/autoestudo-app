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
  
  
  
  async function _salvarToken(storageChave, storageValor){
    await AsyncStorage.setItem(storageChave, storageValor)
      .then(resp => console.log('Token de usuario salvo'))
      .catch(err => console.log('Deu erro para salvar token de usuario = '+err))
  };



  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório'),
        senha: Yup.string().required('A senha é obrigatória'),
      //senha: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória'),
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
          const responseString = response.data.id;
          _salvarToken("@tokenUsuario", responseString.toString())
          console.log(response.data.id)
          _reloadTeste();
        }catch(err){
          Alert.alert('Login', 'Usuário e/ou senha não encontrados')
      }
    }
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
