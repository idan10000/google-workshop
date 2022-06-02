import * as React from 'react';
import {Modal, Portal, Button, Provider, Chip, Headline, TextInput, FAB} from 'react-native-paper';
import {TouchableOpacity, View, StyleSheet, Image, Text, ImageBackground, ImageBackgroundComponent, Dimensions,ScrollView} from 'react-native'
import Report, {reportConverter} from '../../data_classes/Report'
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";
import {Nofar_styles} from "../../styles/NofarStyle";
import {addDoc, arrayUnion, collection, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {useContext} from "react";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/Firebase";
import Icon from 'react-native-vector-icons/Entypo';
import StepIndicator from 'react-native-step-indicator';
import * as ImagePicker from "expo-image-picker";

// Expected input from previous screen is:
// edit - if the Report is being edited (TRUE) or it is a new Report (FALSE)
// Report - if the Report is being edited this is the values it had, null otherwise
// ref - the DB page reference to where the Report was written to

export default function Screen1Poster({route, navigation}) {

    const labels = ["תמונה","מיקום","פרטים"];
    console.log("opened Report screen")
    let report = route.params.report


    const nextScreen = async () => {
        // navigation.pop()

        console.log(selectedImage)
        navigation.navigate("PosterCreation2", {image: selectedImage,edit: false, ref: route.params.ref})

    }

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
        currentStepLabelColor: "#DCA277"
    }
    //---------------------- Create / Edit setup ----------------------
    let prevPoster = route.params.poster

    const initImage = route.params.edit ? prevPoster.image : null
    const [selectedImage, setSelectedImage] = React.useState(initImage);
    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }
        console.log(pickerResult)
        setSelectedImage(pickerResult.uri);
    };
    let imagePicker = (
        <View style={{...styles.pictureContainer, borderWidth: 1, alignSelf: 'center'}}>
            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickButton}
            >
                <Text style={Nofar_styles.SmallButtonTitle}>בחר תמונה</Text>
            </TouchableOpacity>
        </View>
    );

    if (selectedImage !== null) {
        imagePicker = (
            <View>
                <View style={{...styles.pictureContainer, alignSelf: 'center'}}>
                    <Image
                        style={styles.pictureContainer}
                        source={{uri: selectedImage}}
                    />
                </View>
                <View style={stylesPoster.fabContainer}>
                    <FAB
                        style={stylesPoster.fab}
                        small
                        icon={"image-edit"}
                        onPress={openImagePickerAsync}
                    />
                </View>
            </View>
        );
    }


    return (
        <ScrollView  style = {Nofar_styles.container} >
            <View         marginVertical="5%">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={labels}
                    stepCount={3} /></View>

                {imagePicker}
                    <View >
                        <TouchableOpacity
                            onPress={nextScreen}
                            style={styles.proceedButton}>
                            <Text style={Nofar_styles.TinyButtonTitle}>הוספה והמשך</Text>
                        </TouchableOpacity>
                    </View>
        </ScrollView>
    );
};

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

    pictureContainer: {
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 1.5,
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center"

    },
    card: {
        resizeMode: "contain",
        flex: 1},
    pickButton: {
        paddingVertical:"3%",
    alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#DCA277",
        marginVertical:"5%",
        width: Dimensions.get("window").width / 2.2,
    }


});


