import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListTarefa from './pages/List_Tarefa';
import ListTarefaDia from './pages/List_TarefaDia';
import ListTarefaMes from './pages/List_TarefaMes'
import ListResultadoDia from './pages/List_ResultadoDia';
import ListResultadoMes from './pages/List_ResultadoMes';

import NewTarefa from './pages/New_Tarefa';
import NewTarefa2 from './pages/New_Tarefa_2';
import NewMes from './pages/New_Mes';

import AppCadastro from './pages/App_Cadastro';
import AppLogin from './pages/App_Login';

const AppStack = createStackNavigator();

export default function Routes(){
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>

        <AppStack.Screen name="AppLogin" component={AppLogin}/>
        <AppStack.Screen name="AppCadastro" component={AppCadastro}/>

        <AppStack.Screen name="NewTarefa" component={NewTarefa}/>
        <AppStack.Screen name="NewTarefa2" component={NewTarefa2}/>
        <AppStack.Screen name="NewMes" component={NewMes}/>

        <AppStack.Screen name="ListTarefa" component={ListTarefa}/>
        <AppStack.Screen name="ListTarefaDia" component={ListTarefaDia}/>
        <AppStack.Screen name="ListResultadoDia" component={ListResultadoDia}/>
        <AppStack.Screen name="ListResultadoMes" component={ListResultadoMes}/>
        <AppStack.Screen name="ListTarefaMes" component={ListTarefaMes}/>

      </AppStack.Navigator>
    </NavigationContainer>
  );
}
