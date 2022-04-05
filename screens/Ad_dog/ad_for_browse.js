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
import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";

export default function AdForBrowse() {
  const makeCall = () => {
    console.log("Its calling");
    let phoneNumber = "tel://+1234567890";
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemplate />

        <View style={AR_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.BigButton}
            onPress={makeCall()}
            activeOpacity={0.7}
          >
            <Text style={Nofar_styles.BigButtonText}>צור קשר עם הבעלים</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
