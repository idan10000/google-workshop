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

// this is the first screen when you want to post a report. we present the chosen picture and let the user change it



// Expected input from previous screen is:
// edit - if the Report is being edited (TRUE) or it is a new Report (FALSE)
// Report - if the Report is being edited this is the values it had, null otherwise
// ref - the DB page reference to where the Report was written to
export default function Screen1Report({route, navigation}) {

    const labels = ["תמונה","מיקום","פרטים"];
    console.log("opened Report screen")
    let report = route.params.report

    //---------------------- Tag Selection Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    const tagList = [
        {tag: "ביישן", state: false},
        {tag: "חברותי", state: false},
        {tag: "אגרסיבי", state: false},
    ];


    // init tags with previous values if reached this page from an edit Report
    const initSelectedTagList = route.params.edit ? report.tagList.map((tag) => ({tag: tag, state: false})) : []
    const initModalTagList = route.params.edit ?
        tagList.filter((item) => !initSelectedTagList.some(e => e.tag === item.tag)) : tagList
    const [modalTags, setModalTags] = React.useState(initModalTagList);
    const [selectedTags, setSelectedTags] = React.useState(initSelectedTagList);

    const modalChipHandler = (index) => {
        setModalTags(prevStates => {
            var temp = [...prevStates]
            temp[index].state = !temp[index].state
            return temp
        });
    }

    const modalConfirmPressHandler = () => {
        setSelectedTags((prevSelected) => {
            return prevSelected.concat(modalTags.filter(modalTags => modalTags.state));
        });
        setModalTags((prevTags) => {
            return prevTags.filter(prevTags => !prevTags.state)
        });
        hideTagModal();
    }

    const selectedTagPressHandler = (tag) => {
        setModalTags(prevTags => ([...prevTags, {tag: tag, state: false}]))
        setSelectedTags(prevSelected => (prevSelected.filter((prevSelected) => prevSelected.tag !== tag)))
    }

    //---------------------- Details Modal ----------------------

    const nextScreen = async () => {
        // navigation.pop()


        navigation.navigate("ReportCreation2", {image: route.params.image,edit: false, ref: route.params.ref})

    }
    const [visibleDetails, setVisibleDetails] = React.useState(false);
    const showDescriptionModal = () => setVisibleDetails(true);
    const hideDescriptionModal = () => setVisibleDetails(false);

    const initDescription = route.params.edit ? report.description : ''
    const [descriptionText, setDescription] = React.useState(initDescription);

    const [location, setLocation] = React.useState('');

    // console.log(route.params)
    const reportConfirmHandler = async () => {;
        let date = new Date()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        let today = route.params.edit ? report.date : dd + '/' + mm + '/' + yyyy;
        const plainTags = selectedTags.map((function (tag) {
            return tag.tag
        }))

        const dbReport = new Report(image, "", location, today, plainTags, descriptionText, user.uid) // Report to upload to DB
        const sendReport = new Report(image, "", location, today, plainTags, descriptionText, user.uid) // Report to send to the Report page

        const db = fireStoreDB;

        // if we reached from an edit Report
        if (route.params.edit) {
            // if the Report was changed, update the Report page
            if (deepDiffer(sendReport, report)) {
                const imageAndPath = await uploadImageAsync(image,"Reports")
                dbReport.image = imageAndPath.link
                dbReport.imagePath = imageAndPath.path
                const docRef = await setDoc(doc(db,"Reports",route.params.ref).withConverter(reportConverter), dbReport).then(() => {
                    console.log("updated Report page")
                }).catch(error => {
                    console.log(error)
                });
            }
            navigation.pop()
            navigation.navigate("ReportPage", {data: sendReport, ref: route.params.ref})
        } else {
            const imageAndPath = await uploadImageAsync(image,"Reports")
            dbReport.image = imageAndPath.link
            dbReport.imagePath = imageAndPath.path
            const docRef = await addDoc(collection(db, "Reports").withConverter(reportConverter), dbReport)
            console.log("uploaded Report")
            await updateDoc(doc(db, "Users", user.uid), {reports: arrayUnion(docRef)}).then(() => {
                navigation.pop()
                navigation.navigate("ReportPage", {data: sendReport, ref: docRef.id})
            }).catch(error => {
                console.log(error)
            });
        }
    }
    // const customStyles = {
    //     stepIndicatorSize: 25,
    //     currentStepIndicatorSize:30,
    //     separatorStrokeWidth: 2,
    //     currentStepStrokeWidth: 3,
    //     stepStrokeCurrentColor: '#fe7013',
    //     stepStrokeWidth: 3,
    //     stepStrokeFinishedColor: '#fe7013',
    //     stepStrokeUnFinishedColor: '#aaaaaa',
    //     separatorFinishedColor: '#fe7013',
    //     separatorUnFinishedColor: '#aaaaaa',
    //     stepIndicatorFinishedColor: '#fe7013',
    //     stepIndicatorUnFinishedColor: '#ffffff',
    //     stepIndicatorCurrentColor: '#ffffff',
    //     stepIndicatorLabelFontSize: 13,
    //     currentStepIndicatorLabelFontSize: 13,
    //     stepIndicatorLabelCurrentColor: '#fe7013',
    //     stepIndicatorLabelFinishedColor: '#ffffff',
    //     stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    //     labelColor: '#999999',
    //     labelSize: 13,
    //     currentStepLabelColor: '#fe7013'
    // }
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
    const initImage = route.params.edit ? report.image : route.params.image
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
    return (
        <ScrollView  style = {Nofar_styles.container} >

            <Provider>
                {/*Modal (pop up screen) for selecting the tags describing the dog*/}


                <View style = {Nofar_styles.container}>
                    <View         marginTop="2.5%">
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={0}
                            labels={labels}
                            stepCount={3} /></View>
                    <View>
                <View style={styles.pictureContainer}>
                        <Image
                            source={{uri: selectedImage}}
                            style={styles.pictureContainer}/>
                    </View>
                    {  !route.params.edit && route.params.gallery &&
                    <View style={stylesPoster.fabContainer}>
                        <FAB
                            style={stylesPoster.fab}
                            small
                            icon={"image-edit"}
                            onPress={openImagePickerAsync}
                        />
                    </View>}</View>
                    <View >
                        <TouchableOpacity
                            onPress={nextScreen}
                            style={styles.proceedButton}>
                            <Text style={Nofar_styles.TinyButtonTitle}>הוספה והמשך</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Provider>
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
        flex: 1}


    });


