import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";

export default function AdTemplate({poster}) {
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
      <View>
        <Text style={{...Nofar_styles.BigTitle, paddingBottom:"3%"}}>{poster.dogName}</Text>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={Nofar_styles.mainImage}
            source={{uri:poster.image}}/>
        </View>
      </View>

      <View style={{ ...Nofar_styles.Viewchips, marginTop: "3%" }}>
        {poster.tagList.map((item, index) => (
            <Chip
                key={index}
                selected={false}
                style={Nofar_styles.chips}
            >
              {item.tag}
            </Chip>
        ))}
      </View>

      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{poster.description}</Text>
        </View>
      </View>
      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תאריך פרסום</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{poster.date}</Text>
        </View>
      </View>
    </View>
  );
}
