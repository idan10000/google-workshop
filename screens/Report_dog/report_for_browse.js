import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";

import ReportTemplate from "./report_template";
export default function ReportForBrowser() {
  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
            <Text style={Nofar_styles.BigButtonText}>צור קשר עם המדווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
