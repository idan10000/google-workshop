import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";

import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
export default function AdPage({ navigation }) {
  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemplate />
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
            onPress={() => {
              navigation.replace("CreateAd");
            }}
          >
            <Text style={Nofar_styles.BigButtonText}>עדכן את המודעה</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
