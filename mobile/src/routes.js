import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailUsuario from './pages/Detail_Usuario'
import ListUsuario from './pages/List_Usuario';
import ListTarefa from './pages/List_Tarefa'

const AppStack = createStackNavigator();

export default function Routes(){
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="ListUsuario" component={ListUsuario}/>
        <AppStack.Screen name="ListTarefa" component={ListTarefa}/>
        <AppStack.Screen name="DetailUsuario" component={DetailUsuario}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
