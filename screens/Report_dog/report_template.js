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

      <View style={{alignSelf: "center" }}>
        <Image style={AR_styles.mainImage} source={{uri: report.image}} />
      </View>

        <View style={{ ...Nofar_styles.Viewchips, marginVertical: "3%", marginLeft:"1.2%"}}>
        {
          report.tagList.map((item, index) => (
              <Chip key={index}
                    icon={"close"}
                    selected={false}
                    style={Nofar_styles.chips}
                    >{item.tag}</Chip>
          ))
        }
      </View>

      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{report.description}</Text>
        </View>
      </View>
    </View>
  );
}
