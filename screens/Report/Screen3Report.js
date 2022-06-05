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
import {deleteObject, ref, getStorage} from "firebase/storage";
import * as geofire from "geofire-common";
import {reverseGeocodeAsync} from "expo-location"
export default function Screen3Report({route, navigation}) {
    let report = route.params.report

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [correctPhone, setCorrectPhone] = React.useState(true);



    const db = fireStoreDB;
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
    let initPhone = "loading..."
    if (route.params.edit && !initializedPhone) {
        initPhone = report.phoneNumber
    }
    else if(initializedPhone){
    }
    else {

        getDoc(doc(db, "Users",user.uid)).then((snapshot) => {
            const newPhone = snapshot.get("phone")
            initPhone = newPhone
            setPhone(newPhone)
            setInitializedPhone(true)

        })

    }

    const [descriptionText, setDescription] = React.useState(initDescription);
    const [phoneText, setPhone] = React.useState(initPhone);


    const [checked, setChecked] = React.useState(true);

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
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }

    const nextScreen = async () => {
        if((phoneRegExp.test(phoneText) === true && phoneText.length == 10 && checked) || !checked) {
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
            const [addressResponse] = await reverseGeocodeAsync(templocation)
            const address = `${addressResponse.street} ${addressResponse.streetNumber}, ${addressResponse.city}`;
            console.log(address)
            const dbReport = new Report(image, "", location, address, today, time, plainTags, descriptionText, "", phoneText, checked, name, user.uid) // Report to upload to DB
            const sendReport = new Report(image, "", location, address, today, time, plainTags, descriptionText, "", phoneText, checked, name, user.uid) // Report to send to the Report page


            // if we reached from an edit Report
            if (route.params.edit) {
                // if the Report was changed, update the Report page
                if (deepDiffer(sendReport, report)) {
                    await deleteObject(ref(getStorage(), report.imagePath))
                    const imageAndPath = await uploadImageAsync(image, "Reports")
                    dbReport.image = imageAndPath.link
                    dbReport.imagePath = imageAndPath.path
                    const docRef = await setDoc(doc(db, "Reports", route.params.ref).withConverter(reportConverter), dbReport).then(() => {
                        console.log("updated Report page")
                    }).catch(error => {
                        console.log(error)
                    });
                }
                navigation.pop()
                navigation.navigate("ReportPage", {data: sendReport, ref: "", contact: checked})
            } else {
                const imageAndPath = await uploadImageAsync(image, "Reports")
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
        else{
            setCorrectPhone(false)
        }
    }
    if (phoneRegExp.test(phoneText) === true && phoneText.length == 10 && correctPhone === false){
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
                            <View marginHorizontal="7.5%" marginTop="2.5%" marginBottom="2.5%">

                                <Text style={styles.textFound}>תיאור הכלב שנמצא:</Text></View>
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
                                    <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות לתיאור הכלב:</Text>
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
                                            keyboardType = 'numeric'

                                            placeholder={'הוסף טלפון'}
                                            value={phoneText}
                                            onChangeText={setPhone}
                                            mode={'outlined'}
                                            activeUnderlineColor="#000000"
                                            activeOutlineColor="#000000"
                                        />
                                    </View>}
                                {checked && !correctPhone &&

                                    <View marginLeft= "7.5%">
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

                        <Text style={styles.textFound}>תיאור הכלב שנמצא:</Text></View>
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
                            <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות לתיאור הכלב:</Text>
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
                                    keyboardType = 'numeric'

                                    placeholder={'הוסף טלפון'}
                                    value={phoneText}
                                    onChangeText={setPhone}
                                    mode={'outlined'}
                                    activeUnderlineColor="#000000"
                                    activeOutlineColor="#000000"
                                />
                            </View>}
                        {checked && !correctPhone &&

                            <View marginLeft= "7.5%">
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
