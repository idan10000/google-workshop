import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import React from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';
import Map from "../Map/Map";

export default function Screen2Report({route, navigation}) {
    // console.log(route.params.data)

    const labels = ["תמונה","מיקום","פרטים"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: "#DCA277",
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: "#DCA277",
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: "#DCA277",
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: "#DCA277",
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: "#DCA277",
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        // labelColor: '#000',
        labelSize: 13,
        currentStepLabelColor: "#DCA277",



    }
    const initLocation = route.params.edit ? route.params.data.location : 0

    const nextScreen = async () => {
        // navigation.pop()

        navigation.navigate("ReportCreation3", {report : "none",location: initLocation, image: route.params.image ,edit : route.params.edit, ref: route.params.ref})

    }
    return (
        <ScrollView  style = {Nofar_styles.container} >

        <View style = {Nofar_styles.container}>
            <View         marginTop="2.5%">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={1}
                    labels={labels}
                    stepCount={3}
                /></View>

                <Map startLocation = {initLocation}>
                </Map>

            <TouchableOpacity
                onPress={nextScreen}
                style={styles.proceedButton}>
                <Text style={Nofar_styles.TinyButtonTitle}>המשך</Text>

            </TouchableOpacity>
        </View>
        </ScrollView >

    );
}

const styles = StyleSheet.create({
    backgroundCamera:{
        marginTop :"5%",
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 1.5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        resizeMode: "cover",
    },
    proceedButton :{
        paddingVertical:"3%",
        paddingRight: "5%",
        paddingLeft: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#DCA277",
        marginVertical:"5%",
        width: Dimensions.get("window").width / 2.2,
        marginLeft: (Dimensions.get("window").width - Dimensions.get("window").width / 1.2)/2

    },



});
