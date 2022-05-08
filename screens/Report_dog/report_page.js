import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";
import ReportTemplate from "./report_template";
import {Button} from "react-native-paper";
export default function ReportPage({ route, navigation }) {

  const editButtonPressHandler = () => {
    console.log("opening report screen");
    console.log(route.params.ref)
    navigation.navigate("ReportCreation", {
      report: route.params.data,
      edit: true,
      ref: route.params.ref
    });
  };

  console.log(route.params.data)

  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate data={route.params.data} />
        <View style={AR_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.BigButton}
            onPress={() => {}}
          >
            <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
          </Button>
        </View>

        <View style={AR_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.BigButton}
            onPress={editButtonPressHandler}
          >
            <Text style={Nofar_styles.BigButtonText}>עדכן את הדיווח</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
