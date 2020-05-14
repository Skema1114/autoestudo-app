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

import DetailUsuario from './pages/Detail_Usuario';


const AppStack = createStackNavigator();

export default function Routes(){
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Teste" component={Teste}/>
        
        <AppStack.Screen name="ListUsuario" component={ListUsuario}/>
        <AppStack.Screen name="ListMes" component={ListMes}/>
        <AppStack.Screen name="ListDia" component={ListDia}/>
        <AppStack.Screen name="ListTarefa" component={ListTarefa}/>
        <AppStack.Screen name="ListTarefaDia" component={ListTarefaDia}/>
        <AppStack.Screen name="ListResultadoDia" component={ListResultadoDia}/>
        <AppStack.Screen name="ListResultadoMes" component={ListResultadoMes}/>

        <AppStack.Screen name="DetailUsuario" component={DetailUsuario}/>

      </AppStack.Navigator>
    </NavigationContainer>
  );
}
