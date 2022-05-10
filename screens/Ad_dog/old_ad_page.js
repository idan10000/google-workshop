import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView,ImageBackground } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";

import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
import {Button} from "react-native-paper";
export default function AdPage({navigation, route}) {

  console.log("opening report screen");

  const editButtonPressHandler = () => {
    console.log(route.params.ref)
    navigation.navigate("CreateAd", {
      poster: route.params.data,
      edit: true,
      ref: route.params.ref
    });
  };

  console.log(route.params.data)
  return (
      // <ImageBackground flex= "1"
      //                  source={require('../assets/new_background.png')}>
    <View style={Nofar_styles.container}>
      <ScrollView style={AR_styles.content}>
        <AdTemplate data={route.params.data}/>
        <View style={AR_styles.confirmBTContainer}>
          <Button
              mode={"contained"}
              style={Nofar_styles.BigButton}
              onPress={() => {}}
          >
            <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
          </Button>
        </View>

        <View style={AR_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.BigButton}
            onPress={editButtonPressHandler}
          >
            <Text style={Nofar_styles.BigButtonText}>עדכן את המודעה</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
        // </ImageBackground>
  );
}
