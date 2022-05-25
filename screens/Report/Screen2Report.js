import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import React from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';

export default function Screen2Report({route, navigation}) {
    const labels = ["תמונה","מיקום","פרטים"];
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
    const nextScreen = async () => {
        // navigation.pop()

        navigation.navigate("ReportCreation3")

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

                <Image style = {styles.backgroundCamera}
                       source={require('../../assets/map.png')}>
            </Image>
            {/*nofar should had here map indicating*/}

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



});
