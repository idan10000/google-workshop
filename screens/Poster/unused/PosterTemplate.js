import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Avatar, Chip } from "react-native-paper";
import { Nofar_styles } from "../../../styles/NofarStyle";
import { AR_styles } from "../PosterStyle";
import Icon from "react-native-vector-icons/Entypo";
import imageContainer from "../../../shared_components/unused/ImageContainer";

export default function PosterTemplate({ data }) {
  const report_data = {
    name: " בוני",
    desc: "אבד בפארק העירוני בסביבות השעה ארבע ביום ראשון. בעקבות רעש זיקוקים.",
    image: "",
    place: "",
    tags: [],
    date: "04/04/2022",
  };
  console.log(data);

  return (
    <ScrollView style={AR_styles.content}>
      <View>
        <View>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={Nofar_styles.mainImage}
              source={{ uri: data.image }}
            ></Image>

            <View style={styles.textOnComponent}>
              <View style={styles.centerVertical}>
                <Text style={styles.dogsName}>{data.dogName}</Text>
              </View>
              <View style={styles.centerVertical}>
                <Text style={styles.dotName}>·</Text>
              </View>
              <View style={styles.centerVerticalDot}>
                <Text style={styles.dogsName}>{data.dogName}</Text>
              </View>
            </View>
          </View>
        </View>
        <View marginVertical="4%">
          <View style={AR_styles.lastSeen}>
            <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
            <Icon name="location-pin" size={22} color="#000" />
            <TouchableOpacity>
              <Text
                fontSize="16"
                lineHeight="20"
                fontWeight="500"
                textAlign="center"
              >
                {data.location}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.whenText}>בתאריך: {data.date}</Text>
        </View>
        <View style={{ ...Nofar_styles.Viewchips }}>
          <View style={styles.containerChips}>
            {data.tagList.map((item, index) => (
              <Chip key={index} selected={false} style={Nofar_styles.chips}>
                {item}
              </Chip>
            ))}
          </View>
          <View>
            <TouchableOpacity>
              <Icon name="chevron-down" size={32} color="#000"></Icon>
            </TouchableOpacity>
          </View>
        </View>

        {/*<View marginTop="3%" ><Text style = {styles.descriptionText}>תיאור</Text></View>*/}

        <View style={AR_styles.myCard}>
          <View style={AR_styles.cardHeader}>
            <Text>{data.description}</Text>
          </View>
        </View>
        <View style={styles.dogOwner}>
          <Text style={styles.descriptionText}>בעל הכלב:</Text>
        </View>

        <View style={AR_styles.ownerData}>
          <Text style={styles.whenText}> דוד דוד</Text>
          <View style={AR_styles.verticalLine}></View>
          <TouchableOpacity style={AR_styles.contact}>
            <Text style={AR_styles.contactTitle}>צור קשר</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  whenText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    alignSelf: "center",
  },

  textOnComponent: {
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "rgba(00, 00, 00, 0.6)",
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 16,
    marginTop:
      Dimensions.get("window").height / 2.2 -
      Dimensions.get("window").height / 16,
    borderRadius: 2,
  },
  dogsName: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  dotName: {
    fontSize: 32,
    color: "#FFFFFF",
  },
  centerVertical: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    marginHorizontal: "4%",
  },
  centerVerticalDot: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    marginHorizontal: "4%",
  },
  containerChips: {
    width: Dimensions.get("window").width / 1.2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBAA8F",
    flexDirection: "row",
    marginBottom: "3%",
  },
  dogOwner: {
    marginHorizontal: "3%",
  },
});
