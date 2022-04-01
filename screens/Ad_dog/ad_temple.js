import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";

import { AR_styles } from "./Ad_style";

export default function AdTemple() {
  const report_data = {
    name: " בוני",
    desc: "אבד בפארק העירוני בסביבות השעה ארבע ביום ראשון. בעקבות רעש זיקוקים.",
    image: "",
    place: "",
    tags: [],
    price: "100 $",
  };
  return (
    <View style={AR_styles.container}>
      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.name}>{report_data.name}</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <View style={AR_styles.mainImageContainer}>
            <Image style={AR_styles.mainImage} source={require("./dog1.png")} />
          </View>
        </View>
      </View>
      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.cardTitle}>תגיות</Text>
          <View style={AR_styles.chips}>
            <Chip>צולע</Chip>
            <Chip>שריטה על האף</Chip>
            <Chip>זנב נפול</Chip>
          </View>
        </View>
      </View>

      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.cardTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={AR_styles.description}>{report_data.desc}</Text>
        </View>
      </View>

      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.cardTitle}>פרס כספי</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={AR_styles.description}>{report_data.price}</Text>
        </View>
      </View>
    </View>
  );
}
