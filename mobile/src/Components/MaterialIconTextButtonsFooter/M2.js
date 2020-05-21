import React, {} from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

function M1() {
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

      case 3:
        console.log('ListTarefaMes')
      break;
    }
    
  }


  return (
    <View style={[styles.containerNormalFooter]}>
        
        <TouchableOpacity 
          style={styles.buttonSelectFooter}
          onPress={() => navigateToTela(1)}>
          <MaterialCommunityIconsIcon
            name="heart"
            style={styles.iconSelectFooter}>
          </MaterialCommunityIconsIcon>
          <Text style={styles.textSelectFooter}>Hoje</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(2)}>
          <MaterialCommunityIconsIcon
            name="timer"
            style={styles.iconNormalFooter}>
          </MaterialCommunityIconsIcon>
          <Text style={styles.textNormalFooter}>Tarefa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(3)}>
          <MaterialCommunityIconsIcon
            name="map-marker-radius"
            style={styles.iconNormalFooter}>
          </MaterialCommunityIconsIcon>
          <Text style={styles.textNormalFooter}>Histórico</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonNormalFooter}
          onPress={() => navigateToTela(4)}>
          <MaterialCommunityIconsIcon
            name="map-marker-radius"
            style={styles.iconNormalFooter}>
          </MaterialCommunityIconsIcon>
          <Text style={styles.textNormalFooter}>Resultado</Text>
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
    paddingTop: 4
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
    paddingTop: 4
  },
});

export default M1;
