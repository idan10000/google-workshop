import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { AR_styles } from "./Report_style";

import ReportTemplate from "./report_template";
export default function ReportPage({route, navigation}) {

  const editButtonPressHandler = () => {
    console.log("opening report screen")
    navigation.navigate("ReportCreation",{report:route.params.report,edit:true})
  }

  return (
    <View style={AR_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate report={route.params.report} />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}>פתח מיקום במפה</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={editButtonPressHandler}>
            <Text style={AR_styles.shareButtonText}>עדכן דיווח</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}> מחק דיווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
