import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";
export default function ReportTemplate({ report }) {
  const report_data = {
    desc: "נמצא בפארק העירוני בסביבות השעה ארבע ביום ראשון .",
    image: "",
    place: "",
    tags: [],
    date: "04/04/2022",
  };
  return (
    <View style={Nofar_styles.container}>
      <View style={{ ...Nofar_styles.mainImage, alignSelf: "center" }}>
        <Image style={Nofar_styles.mainImage} source={require("./dog1.png")} />
      </View>

      <View style={{ ...Nofar_styles.Viewchips, marginTop: "10" }}>
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
