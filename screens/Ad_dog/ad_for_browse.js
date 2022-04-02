import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
export default function AdForBrowse() {
  return (
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemplate />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
            <Text style={Nofar_styles.BigButtonText}>צור קשר עם הבעלים</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
