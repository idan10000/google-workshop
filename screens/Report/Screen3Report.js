import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button, Chip, TextInput} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import React from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";

export default function Screen3Report({route, navigation}) {
    const tagList = [
        {tag: "ביישן", state: false},
        {tag: "חברותי", state: false},
        {tag: "אגרסיבי", state: false},
        {tag: "שמח", state: false},
        {tag: "עצוב", state: false},
        {tag: "בודד", state: false},
        {tag: "ביישן", state: false},
        {tag: "חברותי", state: false},
        {tag: "אגרסיבי", state: false},
        {tag: "שמח", state: false},
        {tag: "עצוב", state: false},
        {tag: "בודד", state: false},
    ];
    const modalChipHandler = (index) => {
        setModalTags(prevStates => {
            var temp = [...prevStates]
            temp[index].state = !temp[index].state
            return temp
        });
    }
    const initModalTagList = tagList


    const [modalTags, setModalTags] = React.useState(initModalTagList);
    const labels = ["Image","Location","Description"];
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
        navigation.pop()
        navigation.navigate("ReportPage")

    }
    // const initDescription = route.params.edit ? report.description : ''
    const initDescription =''
    const [descriptionText, setDescription] = React.useState(initDescription);
    return (
        <View style = {Nofar_styles.container}>
            <View  marginTop="2.5%">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={2}
                    labels={labels}
                    stepCount={3}
                /></View>
            <View marginHorizontal = "7.5%" marginTop ="5%" marginBottom ="2.5%">

            <Text style = {styles.textFound}>תיאור הכלב שנמצא:</Text></View>
            <View style={styles.chips}>
                {modalTags.map((item, index) => (
                    <Chip
                        key={index}
                        selected={modalTags[index].state}
                        onPress={() => modalChipHandler(index)}
                        style={styles.chip}
                    >
                        {item.tag}
                    </Chip>
                ))}
            </View>
            <View>
            <View style={styles.descriptionContainer}>
            <TextInput
                style={styles.inDescription}
                dense={false}
                placeholder={'הוסף תיאור...'}
                value={descriptionText}
                onChangeText={setDescription}
                mode={'outlined'}
                multiline={true}
            />
        </View>
        </View>
            <TouchableOpacity
                onPress={nextScreen}

                style={styles.proceedButton}>
                <Text style={Nofar_styles.TinyButtonTitle}>יצירת דיווח</Text>

            </TouchableOpacity>
        </View>
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
        alignSelf:"center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#DCA277",
        marginTop:"5%",
        width: Dimensions.get("window").width / 2.2,

    },
    descriptionContainer:{
        marginRight: "7.5%",
        marginLeft: "7.5%",
        justifyContent: "center",
        marginTop:"5%",
        width: Dimensions.get("window").width*0.85,
    },
    inDescription:{
        height: Dimensions.get("window").height*0.3

    },
    chips: {
        flexDirection: "row",
        overflow: "hidden",
        flexWrap: "wrap",
        paddingHorizontal:"7.5%",
    }, textFound: {

        fontSize:16,
        lineHeight:20,
        fontWeight: "700",
    },
    chip: {
        // tp be changed to left
        marginRight: "5%",
        marginVertical: "1.5%",
        paddingHorizontal:"2%",
        height: 35,
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#EADDCA",
    },

});
