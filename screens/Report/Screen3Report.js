import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {Chip, Modal, Portal, Provider, TextInput, Checkbox} from 'react-native-paper';
import {Text, TouchableOpacity} from "react-native";
import React, {useContext} from "react";
import {Nofar_styles} from "../../styles/NofarStyle";
import StepIndicator from 'react-native-step-indicator';
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";
import Report, {reportConverter} from "../../data_classes/Report";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/Firebase";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import * as geofire from "geofire-common";
import Geocoder from "react-native-geocoding";

// this is the third and last screen of the process of uploading a report.
// here you can put tags that express the dog and add a description and phone number if you want to be contacted


export default function Screen3Report({route, navigation}) {
    let report = route.params.report

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [correctPhone, setCorrectPhone] = React.useState(true);

    const db = fireStoreDB;
    const tagList = [
        {tag: "גדול", state: false, num :1},
        {tag: "קטן", state: false, num :2},
        {tag: "בינוני", state: false, num :3},
        {tag: "זכר", state: false, num :4},
        {tag: "נקבה", state: false, num :5},
        {tag: "עונה לשמו", state: false, num :6},
        {tag: "ביישן", state: false, num :7},
        {tag: "פחדן", state: false, num :8},
        {tag: "חברותי", state: false, num :9},
        {tag: "תוקפני", state: false, num :10},
        {tag: "נבחן", state: false, num :11},
        {tag: "שקט", state: false, num :12},
        {tag: "מבוגר", state: false, num :13},
        {tag: "גור", state: false, num :14},
        {tag: "עם קולר", state: false, num :15},
        {tag: "ללא קולר", state: false, num :16},
        {tag: "חירש", state: false, num :17},
        {tag: "עיוור", state: false, num :18}
    ];


    const labels = ["תמונה", "מיקום", "פרטים"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
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
    const initDescription = route.params.edit ? report.description : ''

    const [initializedPhone, setInitializedPhone] = React.useState(false);
    let initPhone = ""
    if (route.params.edit && !initializedPhone) {
        initPhone = report.phoneNumber
    } else if (initializedPhone) {
    } else {

        getDoc(doc(db, "Users", user.uid)).then((snapshot) => {
            const newPhone = snapshot.get("phone")
            initPhone = newPhone
            setPhone(newPhone)
            setInitializedPhone(true)

        })

    }

    const [descriptionText, setDescription] = React.useState(initDescription);
    const [phoneText, setPhone] = React.useState(initPhone);
    console.log(22222222)
    console.log(route.params.edit)


    const initChecked = route.params.edit ? report.contact : true

    const [checked, setChecked] = React.useState(initChecked);

    //---------------------- Tag Selection Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);


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

    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        return hours + ':' + minutes;
    }

    // geocoder setup to return address in hebrew
    Geocoder.init("AIzaSyAGKKpmqjHELTwvwAx0w0Ed8W2LtQ2lwZg", {language: "iw"})


    const nextScreen = async () => {
        if ((phoneRegExp.test(phoneText) === true && phoneText.length === 10 && checked) || !checked) {
            let date = new Date()
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = date.getFullYear();

            const plainTags = selectedTags.map((function (tag) {
                return tag.tag
            }))

            let image = route.params.edit ? report.image : route.params.image
            let today = route.params.edit ? report.date : dd + '/' + mm + '/' + yyyy;
            let time = route.params.edit ? report.time : getCurrentTime();

            const name = user.displayName
            let templocation = route.params.location
            const hash = geofire.geohashForLocation([templocation.latitude, templocation.longitude])
            const location = {
                latitude: templocation.latitude,
                longitude: templocation.longitude,
                geohash: hash
            }
            // const [addressResponse] = await reverseGeocodeAsync(templocation)
            // const address = `${addressResponse.street} ${addressResponse.streetNumber}, ${addressResponse.city}`;
            // console.log(address)
            let json = await Geocoder.from(templocation.latitude, templocation.longitude)
            let address = json.results[0].formatted_address
            address = address.substring(0,address.length - 7)

            const dbReport = new Report(image, "", location, address, today, time, plainTags, descriptionText, "", phoneText, checked, name, user.uid) // Report to upload to DB
            const sendReport = new Report(image, "", location, address, today, time, plainTags, descriptionText, "", phoneText, checked, name, user.uid) // Report to send to the Report page


            // if we reached from an edit Report
            if (route.params.edit) {
                // if the Report was changed, update the Report page
                if (deepDiffer(sendReport, report)) {
                    const docRef = await setDoc(doc(db, "Reports", route.params.ref).withConverter(reportConverter), dbReport).then(() => {
                        console.log("updated Report page")
                    }).catch(error => {
                        console.log(error)
                    });
                }
                navigation.pop()
                navigation.navigate("ReportPage", {data: sendReport, ref: route.params.ref, contact: checked})
            } else {
                const imageAndPath = await uploadImageAsync(image, "Reports")
                dbReport.image = imageAndPath.link
                dbReport.imagePath = imageAndPath.path
                const docRef = await addDoc(collection(db, "Reports").withConverter(reportConverter), dbReport)
                console.log("uploaded Report")
                await updateDoc(doc(db, "Users", user.uid), {reports: arrayUnion(docRef.id)}).then(() => {
                    // navigation.pop()
                    navigation.pop()
                    navigation.pop()
                    navigation.pop()

                    navigation.navigate("ReportPage", {data: sendReport, ref: docRef.id, contact: checked})
                }).catch(error => {
                    console.log(error)
                });
            }
        } else {
            setCorrectPhone(false)
        }
    }
    if (phoneRegExp.test(phoneText) === true && phoneText.length == 10 && correctPhone === false) {
        setCorrectPhone(true)
    }
    return (
        <View style={Nofar_styles.container}>
            {
                !visibleTag &&
                <ScrollView style={Nofar_styles.container}>

                    <Provider>

                        <View style={Nofar_styles.container}>
                            <View marginTop="2.5%">
                                <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={2}
                                    labels={labels}
                                    stepCount={3}
                                /></View>
                            <View marginHorizontal="7.5%" marginTop="5%" marginBottom="2.5%">

                                <Text style={styles.textFound}>פרטים נוספים:</Text></View>
                            <Portal>
                                {/*Tags*/}
                                <Modal
                                    visible={visibleTag}
                                    onDismiss={modalConfirmPressHandler}
                                    contentContainerStyle={stylesPoster.modal}
                                >

                                    <View>
                                        <Text style={{...Nofar_styles.SmallTitle, paddingBottom: "3%"}}>בחר
                                            תגיות:</Text>
                                    </View>
                                    <View style={stylesPoster.chips}>
                                        {modalTags.sort(function (a,b){
                                            if (a.tag > b.tag)
                                                return 1
                                            else
                                                return -1
                                        }).map((item, index) => (
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
                                    <Text style={Nofar_styles.TinyButtonTitle}>הוספת תגיות לתיאור הכלב</Text>
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
                                    selectedTags.sort(function (a,b){
                                        if (a.tag > b.tag)
                                            return 1
                                        else
                                            return -1
                                    }).map((item, index) => (
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
                                        placeholder={'פרטים נוספים'}
                                        value={descriptionText}
                                        onChangeText={setDescription}
                                        mode={'outlined'}
                                        multiline={true}
                                        activeUnderlineColor="#000000"
                                        activeOutlineColor="#000000"
                                    />
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        color="#DCA277"
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}
                                    />
                                    <View>
                                        <Text style={Nofar_styles.TinyButtonTitleBlack}>אפשר יצירת קשר</Text>
                                    </View>
                                </View>
                                {checked &&
                                    <View style={styles.phoneContainer}>
                                        <TextInput
                                            dense={false}
                                            keyboardType='numeric'

                                            placeholder={'טלפון'}
                                            value={phoneText}
                                            onChangeText={setPhone}
                                            mode={'outlined'}
                                            activeUnderlineColor="#000000"
                                            activeOutlineColor="#000000"
                                        />
                                    </View>}
                                {checked && !correctPhone &&

                                    <View marginLeft="7.5%">
                                        <Text style={Nofar_styles.TinyButtonTitleRed2}>אנא הכנס מספר טלפון חוקי</Text>
                                    </View>}
                            </View>
                            <TouchableOpacity
                                onPress={nextScreen}

                                style={styles.proceedButton}>
                                <Text style={Nofar_styles.TinyButtonTitle}>יצירת דיווח</Text>

                            </TouchableOpacity>
                        </View>
                    </Provider>

                </ScrollView>}

            {
                visibleTag &&
                <View style={Nofar_styles.container}>

                    <Provider>

                        <View style={Nofar_styles.container}>
                            <View marginTop="2.5%">
                                <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={2}
                                    labels={labels}
                                    stepCount={3}
                                /></View>
                            <View marginHorizontal="7.5%" marginTop="2.5%" marginBottom="2.5%">

                                <Text style={styles.textFound}>פרטים נוספים:</Text></View>
                            <Portal>
                                {/*Tags*/}
                                <Modal
                                    visible={visibleTag}
                                    onDismiss={modalConfirmPressHandler}
                                    contentContainerStyle={stylesPoster.modal}
                                >

                                    <View>
                                        <Text style={{...Nofar_styles.SmallTitle, paddingBottom: "3%"}}>בחר
                                            תגיות:</Text>
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
                                    <Text style={Nofar_styles.TinyButtonTitle}>הוספת תגיות לתיאור הכלב:</Text>
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
                                        activeUnderlineColor="#000000"
                                        activeOutlineColor="#000000"
                                    />
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        color="#DCA277"
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}
                                    />
                                    <View>
                                        <Text style={Nofar_styles.TinyButtonTitleBlack}>אפשר יצירת קשר</Text>
                                    </View>
                                </View>
                                {checked &&
                                    <View style={styles.phoneContainer}>
                                        <TextInput
                                            dense={false}
                                            keyboardType='numeric'

                                            placeholder={'הוסף טלפון'}
                                            value={phoneText}
                                            onChangeText={setPhone}
                                            mode={'outlined'}
                                            activeUnderlineColor="#000000"
                                            activeOutlineColor="#000000"
                                        />
                                    </View>}
                                {checked && !correctPhone &&

                                    <View marginLeft="7.5%">
                                        <Text style={Nofar_styles.TinyButtonTitleRed2}>אנא הכנס מספר טלפון חוקי</Text>
                                    </View>}
                            </View>
                            <TouchableOpacity
                                onPress={nextScreen}

                                style={styles.proceedButton}>
                                <Text style={Nofar_styles.TinyButtonTitle}>יצירת דיווח</Text>

                            </TouchableOpacity>
                        </View>
                    </Provider>

                </View>}
        </View>

    );
}

const styles = StyleSheet.create({

    button: {
        marginBottom: "2.5%",
        marginHorizontal: "7.5%",
        paddingVertical: "2%",
        paddingRight: "5%",
        paddingLeft: "5%",
        borderRadius: 10,
        backgroundColor: "#DCA277",
    },
    backgroundCamera: {
        marginTop: "5%",
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 1.5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        resizeMode: "cover",
    },
    proceedButton: {
        paddingVertical: "3%",
        paddingRight: "5%",
        paddingLeft: "5%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#DCA277",
        marginVertical: "7.5%",
        width: Dimensions.get("window").width / 2.2,

    },
    descriptionContainer: {
        marginRight: "7.5%",
        marginLeft: "7.5%",
        justifyContent: "center",
        marginTop: "5%",
        width: Dimensions.get("window").width * 0.85,
    },
    phoneContainer: {
        marginRight: "7.5%",
        marginLeft: "7.5%",

        justifyContent: "center",
        width: Dimensions.get("window").width * 0.85,
    },
    checkboxContainer: {
        marginRight: "5%",
        marginLeft: "5%",
        flexDirection: "row",
        marginTop: "5%",
        alignItems: "center"
    },
    inDescription: {
        height: Dimensions.get("window").height * 0.2

    },
    chips: {

        // borderWidth:0.18,
        // borderRadius:10,
        flexDirection: "row",
        overflow: "hidden",
        flexWrap: "wrap",

        paddingHorizontal: "7.5%",
    }, textFound: {

        fontSize: 20,
        lineHeight: 25,
        fontWeight: "700",
    },
    chip: {
        // tp be changed to left
        marginRight: "5%",
        marginVertical: "1.5%",
        paddingHorizontal: "2%",
        height: 35,
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#EADDCA",
    },
    addTagsBTContainer: {
        paddingTop: "2%",
        flexDirection: "row",
    },

});
