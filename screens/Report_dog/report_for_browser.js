import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { AR_styles } from "./Report_style";

import ReportTemple from "./report_temple";
export default function ReportForBrowser() {
  return (
    <View style={AR_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemple />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}>צור קשר עם המדווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
