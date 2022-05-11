import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView,ImageBackground } from "react-native";
import { Nofar_styles } from "../../styles/NofarStyle";
import { AR_styles } from "./ReportStyle";
import ReportTemplate from "./ReportTemplate";
import {Button} from "react-native-paper";
export default function ReportPage({ route, navigation }) {

  const editButtonPressHandler = () => {
    console.log("opening Report screen");
    console.log(route.params.ref)
    navigation.navigate("ReportCreation", {
      report: route.params.data,
      edit: true,
      ref: route.params.ref
    });
  };

  console.log(route.params.data)

  return (<ImageBackground
          style={{flex: 1}}
          source={require('../../assets/new_background.png')}>
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate data={route.params.data} />
        <View style={AR_styles.confirmBTContainer}>
          <TouchableOpacity
            style={Nofar_styles.BigButton}
            onPress={() => {}}
          >
            <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.confirmBTContainer}>
          <TouchableOpacity
            style={Nofar_styles.BigButton}
            onPress={editButtonPressHandler}
          >
            <Text style={Nofar_styles.BigButtonText}>עדכן את הדיווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
        </ImageBackground>
  );
}
