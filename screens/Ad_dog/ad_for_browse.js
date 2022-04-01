import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
export default function AdForBrowser() {
  return (
    <View style={AR_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemplate />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}>צור קשר עם הבעלים</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}