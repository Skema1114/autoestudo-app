import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { Text, Image, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Input from '../../Components/Form/input';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

export default function NewUsuario() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack();
  }

  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O e-mail é obrogatório'),
        senha: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
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
  }

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
