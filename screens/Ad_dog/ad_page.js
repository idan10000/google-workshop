import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

import { AR_styles } from "./Ad_style";
import AdTemple from "./ad_temple";
export default function AdPage() {
  return (
    <View style={AR_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemple />
        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}>פתח מיקום במפה</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}> עדכן את המודעה</Text>
          </TouchableOpacity>
        </View>

        <View style={AR_styles.cardContent}>
          <TouchableOpacity style={AR_styles.shareButton} onPress={() => {}}>
            <Text style={AR_styles.shareButtonText}> מחק את המודעה</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
