import { MaterialIcons, Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, {} from "react";

function M3() {
  const navigation = useNavigation();

  function navigateToTela(tela){
    switch(tela){

      case 1:
        navigation.replace('ListTarefaDia', null, null)
      break;

      case 2:
        navigation.replace('ListTarefa', null, null)
      break;

      case 3:
        navigation.replace('ListTarefaMes', null, null)
      break;

      case 4:
        navigation.replace('ListResultadoDia', null, null)
      break;
    }
  }



  return (
    <View style={[styles.containerNormalFooter]}>
        
        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(1)}>
          <MaterialIcons
            name="assignment-late"
            style={styles.iconNormalFooter}>
          </MaterialIcons>
          <Text style={styles.textNormalFooter}>Tarefas dia</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(2)}>
          <MaterialCommunityIcons
            name="database-search"
            style={styles.iconNormalFooter}>
          </MaterialCommunityIcons>
          <Text style={styles.textNormalFooter}>Tarefas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonSelectFooter}
          onPress={() => navigateToTela(3)}>
          <Entypo
            name="calendar"
            style={styles.iconSelectFooter}>
          </Entypo>
          <Text style={styles.textSelectFooter}>Tarefas mes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(4)}>
          <Foundation
            name="results"
            style={styles.iconNormalFooter}>
          </Foundation>
          <Text style={styles.textNormalFooter}>Resultados</Text>
        </TouchableOpacity>
      </View>
  );
}


const styles = StyleSheet.create({

  buttonSelectFooter: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },

  iconSelectFooter: {
    backgroundColor: "transparent",
    color: "#3f51b5",
    fontSize: 24,
    opacity: 0.8
  },

  textSelectFooter: {
    fontSize: 14,
    color: "#3f51b5",
    backgroundColor: "transparent",
    paddingTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  containerNormalFooter: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },

  buttonNormalFooter: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },

  iconNormalFooter: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },

  textNormalFooter: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4,
    textAlign: 'center'
  },
});

export default M3;
