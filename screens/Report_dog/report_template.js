import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Report_style";
export default function ReportTemplate({ data }) {
  const report_data = {
    desc: "נמצא בפארק העירוני בסביבות השעה ארבע ביום ראשון .",
    image: "",
    place: "",
    tags: [],
    date: "04/04/2022",
  };
    console.log(data)
  return (
    <View style={Nofar_styles.container}>

      <View style={{alignSelf: "center" }}>
        <Image style={AR_styles.mainImage} source={{uri: data.image}} />
      </View>

        <View style={{ ...Nofar_styles.Viewchips, marginVertical: "3%", marginLeft:"1.2%"}}>
        {
          data.tagList.map((item, index) => (
              <Chip key={index}
                    selected={false}
                    style={Nofar_styles.chips}
                    >{item}</Chip>
          ))
        }
      </View>

      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{data.description}</Text>
        </View>
      </View>
    </View>
  );
}
