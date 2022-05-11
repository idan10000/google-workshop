import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Nofar_styles } from "../../styles/NofarStyle";
import { AR_styles } from "../Poster/PosterStyle";

export default function AdTemplate({data}) {
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
        <Text style={{...Nofar_styles.BigTitle, paddingBottom:"3%"}}>{data.dogName}</Text>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={Nofar_styles.mainImage}
            source={{uri:data.image}}/>
        </View>
      </View>

      <View style={{ ...Nofar_styles.Viewchips, marginTop: "3%" }}>
        {data.tagList.map((item, index) => (
            <Chip
                key={index}
                selected={false}
                style={Nofar_styles.chips}
            >
              {item}
            </Chip>
        ))}
      </View>

      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{data.description}</Text>
        </View>
      </View>
      <View style={Nofar_styles.card}>
        <View style={AR_styles.cardHeader}>
          <Text style={Nofar_styles.SmallTitle}>תאריך פרסום</Text>
        </View>
        <View style={AR_styles.cardContent}>
          <Text style={Nofar_styles.text}>{data.date}</Text>
        </View>
      </View>
    </View>
  );
}
