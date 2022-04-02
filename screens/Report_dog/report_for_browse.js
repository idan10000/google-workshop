import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";

import ReportTemplate from "./report_template";
export default function ReportForBrowse() {
  const makeCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <ReportTemplate />
        <View style={{ marginLeft: 15 }}>
          <View style={AR_styles.cardContent}>
            <TouchableOpacity
              style={Nofar_styles.BigButton}
              onPress={makeCall()}
            >
              <Text style={Nofar_styles.BigButtonText}>צור קשר עם המדווח</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
