import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Nofar_styles } from "../utils/Nofar_style";

import { AR_styles } from "./Ad_style";
import AdTemplate from "./ad_template";
import {Button} from "react-native-paper";
import NewAdTemplate from "./newAdTemplate";
export default function NewAdPage({navigation, route}) {

    const editButtonPressHandler = () => {
        console.log("opening report screen");
        console.log(route.params.ref)
        navigation.navigate("CreateAd", {
            poster: route.params.poster,
            edit: true,
            ref: route.params.ref
        });
    };


    return (
        <View style={Nofar_styles.container}>
            <ScrollView style={AR_styles.content}>
                <NewAdTemplate />
                            </ScrollView>
        </View>
    );
}
