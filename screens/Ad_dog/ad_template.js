import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";

export default function AdTemplate() {
  const report_data = {
    name: " בוני",
    desc: "אבד בפארק העירוני בסביבות השעה ארבע ביום ראשון. בעקבות רעש זיקוקים.",
    image: "",
    place: "",
    tags: [],
    date: "04/04/2022",
  };
  return (
    <View style={Nofar_styles.container}>
      <View style={AR_styles.cardHeader}>
        <Text style={Nofar_styles.BigTitle}>{report_data.name}</Text>
      </View>
      <View style={AR_styles.cardContent}>
        <View style={{ ...Nofar_styles.mainImage, alignSelf: "center" }}>
          <Image
            style={Nofar_styles.mainImage}
            source={require("./dog1.png")}
          />
        </View>
      </View>

      <View style={Nofar_styles.Viewchips}>
        <Chip style={Nofar_styles.chips}>
          <Text style={Nofar_styles.chipsText}>צולע</Text>
        </Chip>
        <Chip style={Nofar_styles.chips}>
          <Text style={Nofar_styles.chipsText}>שריטה על האף</Text>
        </Chip>
        <Chip style={Nofar_styles.chips}>
          <Text style={Nofar_styles.chipsText}>זנב נפול</Text>
        </Chip>
      </View>

      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{report_data.desc}</Text>
        </View>
      </View>
    </View>
  );
}
