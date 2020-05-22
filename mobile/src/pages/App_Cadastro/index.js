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

export default function AppCadastro() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack();
  }

  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O e-mail é obrigatório'),
        senha: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      handleLogin(data.nome, data.email, data.senha);
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
    
    async function handleLogin(nome, email, senha){
      const data_cadastro = moment().utcOffset('-03:00').format("LLL");
      const data = {
          nome,
          email,
          senha,
          data_cadastro
      };

      try{
        const response = await api.post('usuario', data);        
          Alert.alert("Cadastro", `Usuário cadastrado com sucesso!`, [{ 
              text: "OK", onPress: () => _reloadLogin() 
            }], { cancelable: false }
          );
      }catch(err){
          Alert.alert('Cadastro', 'Ocorreu um erro ao criar a conta, tente novamente.')
      }
    }
  }

  function _reloadLogin() {
    navigation.replace( 'AppLogin', null, null );
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

      <View style={styles.incident}>
      
      <Input name="nome" label="Nome" />
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
