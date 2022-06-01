import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button, Chip, Modal, Portal, Provider, TextInput, Checkbox} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import React, {useContext} from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";
import {AR_styles} from "./ReportStyle";
import Report, {reportConverter} from "../../data_classes/Report";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/Firebase";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {addDoc, arrayUnion, collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import CheckBox from '@react-native-community/checkbox';

export default function Screen3Report({route, navigation}) {
    let report = route.params.report

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


    //
    // const modalChipHandler = (index) => {
    //     setModalTags(prevStates => {
    //         var temp = [...prevStates]
    //         temp[index].state = !temp[index].state
    //         return temp
    //     });
    // }

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
        currentStepLabelColor: "#DCA277"
    }
    const {user} = useContext(AuthenticatedUserContext);
    console.log(route.params)


    // init tags with previous values if reached this page from an edit Report
    //
    // const initSelectedTagList = route.params.edit ? report.tagList.map((tag) => ({tag: tag, state: false})) : []
    // const initModalTagList = route.params.edit ?
    //     tagList.filter((item) => !initSelectedTagList.some(e => e.tag === item.tag)) : tagList
    // const [modalTags, setModalTags] = React.useState(initModalTagList);
    // const [selectedTags, setSelectedTags] = React.useState(initSelectedTagList);



    //---------------------- Tag Selection Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    // const tagList = [
    //     {tag: "ביישן", state: false},
    //     {tag: "חברותי", state: false},
    //     {tag: "אגרסיבי", state: false},
    // ];


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
    const nextScreen = async () => {

        //first confirming the tags
        // setSelectedTags((prevSelected) => {
        //     return prevSelected.concat(modalTags.filter(modalTags => modalTags.state));
        // });
        // setModalTags((prevTags) => {
        //     return prevTags.filter(prevTags => !prevTags.state)
        // });

        let date = new Date()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        console.log(selectedTags)
        const plainTags = selectedTags.map((function (tag) {
            return tag.tag
        }))

        console.log(plainTags)
        let image = route.params.edit ? report.image : route.params.image

        let today = route.params.edit ? report.date : dd + '/' + mm + '/' + yyyy;
        const dbReport = new Report(image,"", route.params.location, today, plainTags, descriptionText,"", user.uid) // Report to upload to DB
        const sendReport = new Report(image, "", route.params.location, today, plainTags, descriptionText, "", user.uid) // Report to send to the Report page
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
            navigation.navigate("ReportPage")
        } else {
            const imageAndPath = await uploadImageAsync(image,"Reports")
            dbReport.image = imageAndPath.link
            dbReport.imagePath = imageAndPath.path
            const docRef = await addDoc(collection(db, "Reports").withConverter(reportConverter), dbReport)
            console.log("uploaded Report")
            await updateDoc(doc(db, "Users", user.uid), {reports: arrayUnion(docRef)}).then(() => {
                // navigation.pop()
                navigation.pop()
                navigation.pop()
                navigation.pop()

                navigation.navigate("ReportPage", {data: sendReport, ref: docRef.id, contact: checked})
            }).catch(error => {
                console.log(error)
            });
        }
    }
    // const initDescription = route.params.edit ? report.description : ''
    const initDescription =''
    const initPhone = "0547323711"
    // const initPhone = route.params.edit ? report.description : '' need to fix according to real data

    const [descriptionText, setDescription] = React.useState(initDescription);
    const [phoneText, setPhone] = React.useState(initPhone);


    const [checked, setChecked] = React.useState(true);

    return (
        <ScrollView  style = {Nofar_styles.container} >
            <Provider>

        <View style = {Nofar_styles.container}>
            <View  marginTop="2.5%">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={2}
                    labels={labels}
                    stepCount={3}
                /></View>
            <View marginHorizontal = "7.5%" marginTop ="2.5%" marginBottom ="2.5%">

            <Text style = {styles.textFound}>תיאור הכלב שנמצא:</Text></View>
            <Portal>
                {/*Tags*/}
                <Modal
                    visible={visibleTag}
                    onDismiss={modalConfirmPressHandler}
                    contentContainerStyle={stylesPoster.modal}
                >

                    <View>
                        <Text style={{...Nofar_styles.SmallTitle, paddingBottom: "3%"}}>בחר תגיות:</Text>
                    </View>
                    <View style={stylesPoster.chips}>
                        {modalTags.map((item, index) => (
                            <Chip
                                key={index}
                                selected={modalTags[index].state}
                                onPress={() => modalChipHandler(index)}
                                style={Nofar_styles.chips}
                            >
                                {item.tag}
                            </Chip>
                        ))}
                    </View>
                    <View style={{...stylesPoster.modalButtonContainer, paddingTop: "3%"}}>
                        <TouchableOpacity
                            style={Nofar_styles.TinyButton}
                            onPress={modalConfirmPressHandler}
                        >
                            <Text style={Nofar_styles.TinyButtonTitle}>אישור</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/*Details*/}

            </Portal>
            <View style={styles.addTagsBTContainer}>
                <TouchableOpacity
                    // comapct={false}
                    style={styles.button}
                    onPress={showTagModal}
                >
                    <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות</Text>
                </TouchableOpacity>
            </View>
            {/*<View style={styles.chips}>*/}
            {/*    {modalTags.map((item, index) => (*/}
            {/*        <Chip*/}
            {/*            key={index}*/}
            {/*            selected={modalTags[index].state}*/}
            {/*            onPress={() => modalChipHandler(index)}*/}
            {/*            style={styles.chip}*/}
            {/*        >*/}
            {/*            {item.tag}*/}
            {/*        </Chip>*/}
            {/*    ))}*/}
            {/*</View>*/}
            <View style={{...stylesPoster.chips, marginLeft: "2%"}}>
                {
                    selectedTags.map((item, index) => (
                        <Chip key={index}
                              icon={"close"}
                              selected={false}
                              style={{...Nofar_styles.chips, marginTop: "2.5%"}}
                              onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                    ))
                }
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
                <View style = {styles.checkboxContainer}>
                    <Checkbox
                        color = "#DCA277"
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                <View marginTop= "1.5%">
                    <Text style = {Nofar_styles.TinyButtonTitleBlack}>אפשר יצירת קשר</Text>
                </View>
                </View>
                {checked &&
                    <View style={styles.phoneContainer}>
                    <TextInput
                        dense={false}
                        placeholder={'הוסף טלפון'}
                        value={phoneText}
                        onChangeText={setPhone}
                        mode={'outlined'}
                    />
                </View>}
        </View>
            <TouchableOpacity
                onPress={nextScreen}

                style={styles.proceedButton}>
                <Text style={Nofar_styles.TinyButtonTitle}>יצירת דיווח</Text>

            </TouchableOpacity>
        </View>
                </Provider>

        </ScrollView >

            );
}

const styles = StyleSheet.create({

    button:{
        marginBottom: "2.5%",
        marginHorizontal: "7.5%",
        paddingVertical:"2%",
        paddingRight: "5%",
        paddingLeft: "5%",
        borderRadius: 10,
        backgroundColor: "#DCA277",
    },
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
        marginVertical:"7.5%",
        width: Dimensions.get("window").width / 2.2,

    },
    descriptionContainer:{
        marginRight: "7.5%",
        marginLeft: "7.5%",
        justifyContent: "center",
        marginTop:"5%",
        width: Dimensions.get("window").width*0.85,
    },
    phoneContainer:{
        marginRight: "7.5%",
        marginLeft: "7.5%",
        marginTop:"2.5%",

        justifyContent: "center",
        width: Dimensions.get("window").width*0.85,
    },
    checkboxContainer:{
        marginRight: "5%",
        marginLeft: "5%",
        flexDirection : "row",
        marginTop:"5%",
    },
    inDescription:{
        height: Dimensions.get("window").height*0.2

    },
    chips: {

        // borderWidth:0.18,
        // borderRadius:10,
        flexDirection: "row",
        overflow: "hidden",
        flexWrap: "wrap",

        paddingHorizontal:"7.5%",
    }, textFound: {

        fontSize:20,
        lineHeight:25,
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
    addTagsBTContainer: {
        paddingTop:"2%",
        flexDirection:"row",
    },

});
