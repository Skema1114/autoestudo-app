import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Detail from './pages/Detail'
import Usuarios from './pages/Usuarios';

const AppStack = createStackNavigator();

export default function Routes(){
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Usuarios" component={Usuarios}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
