import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";
import ReportTemplate from "./report_template";
export default function ReportPage({ route, navigation }) {
  const editButtonPressHandler = () => {
    console.log("opening report screen");
    navigation.navigate("ReportCreation", {
      report: route.params.report,
      edit: true,
    });
  };

  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
            <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity
            style={Nofar_styles.BigButton}
            onPress={editButtonPressHandler}
          >
            <Text style={Nofar_styles.BigButtonText}>עדכן דיווח</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
            <Text style={Nofar_styles.BigButtonText}> מחק דיווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
