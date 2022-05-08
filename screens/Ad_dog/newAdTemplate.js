import React, { Component } from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";
import {Avatar, Chip} from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NewAdTemplate() {
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
                <Text style={{...Nofar_styles.BigTitle, paddingBottom:"3%"}}>{"yossi"}</Text>
                <View style={{ alignSelf: "center" }}>
                    <Image
                      style={Nofar_styles.mainImage}
                      source={require('./dog1.png')}></Image>
                </View>
            </View>
            <View  flexDirection="column" justifyContent= "center" alignItems= "flex-start">
            <View style = {AR_styles.lastSeen}>

            <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">נצפה לאחרונה ב:</Text>
            <Icon name="location-pin" size={16} color ="#000"  />
            <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">החלוצים 49, תל אביב</Text></TouchableOpacity>
            </View>
            <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">בתאריך:19.02.2022:</Text>
        </View>
            <View style={{ ...Nofar_styles.Viewchips, marginTop: "3%" }}>
                {/*{data.tagList.map((item, index) => (*/}
                {/*    <Chip*/}
                {/*        key={index}*/}
                {/*        selected={false}*/}
                {/*        style={Nofar_styles.chips}*/}
                {/*    >*/}
                {/*      {item}*/}
                {/*    </Chip>*/}
                {/*))}*/}
            </View>
        <View marginRight="10%">
            <Text fontSize="16" lineHeight="20" fontWeight= "500" >בעל הכלב</Text>
        </View>

            <View style = {AR_styles.lastSeen}>

                <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">נצפה לאחרונה ב:</Text>
                <View style={AR_styles.verticalLine}></View>
                <Icon name="location" size={16} color ="#000"  />
                <View style={AR_styles.verticalLine}></View>
                <Icon name="location-pin" size={16} color ="#000"  />

                <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">600 ש"ח</Text>
            </View>
            <View style={Nofar_styles.card}>
                <View style={AR_styles.cardHeader}>
                    <Text style={Nofar_styles.SmallTitle}>תיאור</Text>
                </View>
            </View>

        </View>
    );
}
