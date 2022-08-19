import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Nofar_styles } from "../../styles/NofarStyle";
import { AR_styles } from "./ReportStyle";
import PosterPage from "../Poster/PosterPage";

export default function ReportPage({ route, navigation }) {
  console.log(route.params.data);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/new_background.png")}
    >
      <View style={Nofar_styles.container}>
        <ScrollView style={AR_styles.content}>
          <PosterPage
            route={route}
            navigation={navigation}
            typeOfPage={"report"}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
