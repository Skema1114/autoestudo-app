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

export default function AppLogin() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const id_usuario = '1e54cc5b';

  function navigateBack(){
    navigation.goBack();
  }

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
          
          Alert.alert(
            "Cadastro",
            `Login efetuado no cadastro: ${response.data.id}`,
            [
              { text: "OK", onPress: () => _reloadLogin() }
            ],
            { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Erro ao cadastrar caso, tente novamente.')
      }
    }
  }

  function _reloadLogin() {
    navigation.replace( 'AppLogin', null, null );
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

  async function _storeData(chave, valor){
    try {
      await AsyncStorage.setItem(chave, valor);
      console.log('deu certo')
    } catch (err) {
      console.log(err)
    }
  };

  async function _retrieveData(chave){
    try {
      const value = await AsyncStorage.getItem(chave);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (err) {
      console.log(err)// Error retrieving data
    }
  }


  async function _deleteData(chave){
    try {
      const value = await AsyncStorage.removeItem(chave);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (err) {
      console.log(err)// Error retrieving data
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
      
      <Input name="email" label="Email" />
      <Input name="senha" label="Senha" />

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
