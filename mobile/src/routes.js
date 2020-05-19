import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Teste from './pages/Teste'

import ListUsuario from './pages/List_Usuario';
import ListMes from './pages/List_Mes';
import ListDia from './pages/List_Dia';
import ListTarefa from './pages/List_Tarefa';
import ListTarefaDia from './pages/List_TarefaDia';
import ListResultadoDia from './pages/List_ResultadoDia';
import ListResultadoMes from './pages/List_ResultadoMes';
import ListTarefaMes from './pages/List_TarefaMes'

import DetailUsuario from './pages/Detail_Usuario';
import DetailMes from './pages/Detail_Mes';
import DetailDia from './pages/Detail_Dia';
import DetailTarefa from './pages/Detail_Tarefa';
import DetailTarefaDia from './pages/Detail_TarefaDia';
import DetailResultadoDia from './pages/Detail_ResultadoDia';
import DetailResultadoMes from './pages/Detail_ResultadoMes';

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
        <AppStack.Screen name="Teste" component={Teste}/>
        
        <AppStack.Screen name="AppCadastro" component={AppCadastro}/>
        

        <AppStack.Screen name="NewTarefa" component={NewTarefa}/>
        <AppStack.Screen name="NewTarefa2" component={NewTarefa2}/>
        <AppStack.Screen name="NewMes" component={NewMes}/>

        <AppStack.Screen name="ListUsuario" component={ListUsuario}/>
        <AppStack.Screen name="ListMes" component={ListMes}/>
        <AppStack.Screen name="ListDia" component={ListDia}/>
        <AppStack.Screen name="ListTarefa" component={ListTarefa}/>
        <AppStack.Screen name="ListTarefaDia" component={ListTarefaDia}/>
        <AppStack.Screen name="ListResultadoDia" component={ListResultadoDia}/>
        <AppStack.Screen name="ListResultadoMes" component={ListResultadoMes}/>
        <AppStack.Screen name="ListTarefaMes" component={ListTarefaMes}/>
        
        <AppStack.Screen name="DetailUsuario" component={DetailUsuario}/>
        <AppStack.Screen name="DetailMes" component={DetailMes}/>
        <AppStack.Screen name="DetailDia" component={DetailDia}/>
        <AppStack.Screen name="DetailTarefa" component={DetailTarefa}/>
        <AppStack.Screen name="DetailTarefaDia" component={DetailTarefaDia}/>
        <AppStack.Screen name="DetailResultadoDia" component={DetailResultadoDia}/>
        <AppStack.Screen name="DetailResultadoMes" component={DetailResultadoMes}/>

      </AppStack.Navigator>
    </NavigationContainer>
  );
}
