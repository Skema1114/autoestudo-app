import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialBasicFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.btnWrapper1Row}>
        <TouchableOpacity style={styles.btnWrapper1}>
          <MaterialCommunityIconsIcon
            name="television"
            style={styles.icon1}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.btn1Text}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activebtnWrapper}>
          <MaterialCommunityIconsIcon
            name="music-note"
            style={styles.activeIcon}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.activeText}>Music</Text>
        </TouchableOpacity>
        <View style={styles.btnWrapper2Stack}>
          <TouchableOpacity style={styles.btnWrapper2}>
            <MaterialCommunityIconsIcon
              name="book"
              style={styles.icon2}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.btn2Text}>Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrapper3}>
            <MaterialCommunityIconsIcon
              name="calendar-text"
              style={styles.icon3}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.btn3Text}>Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3f51b5",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    flexDirection: "row"
  },
  btnWrapper1: {
    flex: 1,
    paddingHorizontal: 12,
    maxWidth: 168,
    alignItems: "center",
    height: 57,
    width: 94,
    marginTop: 3
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  btn1Text: {
    color: "#FFFFFF",
    opacity: 0.8
  },
  activebtnWrapper: {
    flex: 1,
    paddingHorizontal: 12,
    maxWidth: 168,
    alignItems: "center",
    height: 63,
    width: 94
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 1
  },
  activeText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 1,
    paddingTop: 4
  },
  btnWrapper2: {
    flex: 1,
    paddingHorizontal: 12,
    maxWidth: 168,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    height: 57,
    width: 94
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  btn2Text: {
    color: "#FFFFFF",
    opacity: 0.8
  },
  btnWrapper3: {
    flex: 1,
    paddingHorizontal: 12,
    maxWidth: 168,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 93,
    height: 57,
    width: 94
  },
  icon3: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  btn3Text: {
    color: "#FFFFFF",
    opacity: 0.8
  },
  btnWrapper2Stack: {
    width: 187,
    height: 57,
    marginTop: 3
  },
  btnWrapper1Row: {
    height: 63,
    flexDirection: "row",
    flex: 1,
    marginRight: -15,
    marginTop: -3
  }
});

export default MaterialBasicFooter;
