import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";

import { AR_styles } from "./Report_style";
export default function ReportTemplate({report}) {
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
        <View style={AR_styles.cardContent}>
          <View style={AR_styles.mainImageContainer}>
            <Image style={AR_styles.mainImage} source={{uri: report.image}} />
          </View>
        </View>
      </View>
      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.cardTitle}>תגיות</Text>
          <View style={AR_styles.chips}>
            {
              report.tagList.map((item, index) => (
                  <Chip key={index}>{item.tag}</Chip>
              ))
            }
          </View>
        </View>
      </View>

      <View style={AR_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={AR_styles.cardTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={AR_styles.description}>{report.description}</Text>
        </View>
      </View>
    </View>
  );
}
