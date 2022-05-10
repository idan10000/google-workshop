import React, { Component } from "react";
import { Text, View, Image,TouchableOpacity, ImageBackground } from "react-native";
import {Avatar, Chip} from "react-native-paper";
import { Nofar_styles } from "../utils/Nofar_style";
import { AR_styles } from "./Ad_style";
import Icon from 'react-native-vector-icons/Entypo';
import {Touchable} from "react-native-web";

export default function NewAdTemplate({data}) {
    const report_data = {
        name: " בוני",
        desc: "אבד בפארק העירוני בסביבות השעה ארבע ביום ראשון. בעקבות רעש זיקוקים.",
        image: "",
        place: "",
        tags: [],
        date: "04/04/2022",
    };
    return (

        <View>
            <View>
                <Text style={{...Nofar_styles.BigTitle, paddingBottom:"3%"}}>{data.dogName}</Text>
                <View style={{ alignSelf: "center" }}>
                    <Image
                      style={Nofar_styles.mainImage}
                      source={{uri:data.image}}></Image>
                </View>
            </View>
            <View  flexDirection="column" justifyContent= "flex-start"
            marginVertical="4%"
            >
            <View style = {AR_styles.lastSeen}>

            <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">נצפה לאחרונה ב: </Text>
            <Icon name="location-pin" size={16} color ="#000"  />
            <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">{data.location}</Text></TouchableOpacity>
            </View>
            <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">בתאריך: {data.date}</Text>
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
        {/*<View justifyContent= "center" alignItems ="center" marginBottom="5%">*/}
        {/*    <Text fontSize="16" lineHeight="20" fontWeight= "500" >בעל הכלב</Text>*/}
        {/*</View>*/}

            <View style = {AR_styles.lastSeen}>

                <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">דוד דוד</Text>
                <View style={AR_styles.verticalLine}></View>
                <TouchableOpacity
                    style={AR_styles.contact}>
                    <Text style={AR_styles.contactTitle}>צור קשר</Text>

                </TouchableOpacity>

                <View style={AR_styles.verticalLine}></View>
                <Icon name="price-tag" size={16} color ="#000"  />
                <View marginLeft="4%">
                <Text fontSize="16" lineHeight="20" fontWeight= "500" textAlign= "center">600 ש"ח</Text>
                </View>

        </View>
            <View style={AR_styles.myCard}>
                <View style={AR_styles.cardHeader}>
                    <Text>{data.description}</Text>
                </View>
            </View>

        </View>

    );
}
