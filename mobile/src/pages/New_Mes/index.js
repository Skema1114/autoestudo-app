import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { Text, Image, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Input from '../../Components/Form/input';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

export default function NewMes() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  function navigateBack(){
    navigation.goBack();
  }

  async function loadTarefaDias(){
    if(loading){
      return;
    }

    if((total > 0) && (tarefaDias.length === total)){
      return;
    }

    setLoading(true);
    const response = await api.get('tarefa_dias', {
      headers: {
        Authorization: '1e54cc5b',
      }
    });

    setTarefaDias([...tarefaDias, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  async function handleSubmit(data, { reset }) {
    try{
      const schema = Yup.object().shape({
      
        qtd_nao: Yup.string().required('A quantidade é obrigatória'),
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
      
      <Input name="qtd_nao" label="Quantidade de não" />

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
