import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import React from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';

export default function Screen1Report({route, navigation}) {

    const labels = ["תמונה","מיקום","פרטים"];

const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
    }




        const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
        navigation.navigate('ReportCreation',{image:result.uri, edit:false})
    }
}
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    }
    // let image = route.params.edit ? report.image : route.params.image
    const nextScreen = async () => {
        // navigation.pop()

        navigation.navigate("ReportCreation2")

    }
    return (
        <ScrollView  style = {Nofar_styles.container} >

        <View style = {Nofar_styles.container}>
            <View         marginTop="2.5%">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={labels}
                    stepCount={3}

                /></View>
            <View style={{ alignSelf: "center" }}>
            <Image style = {styles.backgroundCamera}
                   source={require('../../assets/emptyPictureFixed.png')}>

            </Image>
                <View  style = {styles.textOnComponent}>

            <TouchableOpacity
                // mode='contained'
                // icon='camera'
                style={styles.camButton}
                onPress={openCamera}>
                {/*labelStyle={styles.BigButtonText}>*/}
                <Icon name="camera" size={60} color ="#FFFFFF" />
            </TouchableOpacity>
            </View>
            </View>


            <TouchableOpacity
                onPress={nextScreen}
                style={styles.proceedButton}>
                <Text style={Nofar_styles.TinyButtonTitle}>הוספה והמשך</Text>

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
        marginTop:"5%",
        width: Dimensions.get("window").width / 2.2,
        marginLeft: (Dimensions.get("window").width - Dimensions.get("window").width / 1.2)/2

    },
    camButton : {
        justifyContent :"center",
        alignItems: "center",
        backgroundColor: "#000",
        borderRadius:15


    },
    textOnComponent: {
        alignSelf:"center",
        position: "absolute",
        borderRadius:10,
        marginTop:"110%"
    },
    centerVertical: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        marginHorizontal:"4%",

    },

});
