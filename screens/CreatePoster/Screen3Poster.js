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
import Report, {reportConverter} from "../../data_classes/Report";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/Firebase";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import CheckBox from '@react-native-community/checkbox';
import Poster, {posterConverter} from "../../data_classes/Poster";
import {deleteObject, getStorage, ref} from "firebase/storage";
import * as geofire from "geofire-common";
import {reverseGeocodeAsync} from "expo-location";
import RNDateTimePicker from '@react-native-community/datetimepicker';

// this is the third and last screen of the process of uploading a poster.
// here you can put the name of the dog, tags that express the dog and add a description and phone number

export default function Screen3Poster({route, navigation}) {
    let prevPoster = route.params.poster

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [correctPhone, setCorrectPhone] = React.useState(true);
    const [correctDogName, setCorrectDogName] = React.useState(true);


    // these are the chosen tags to describe a dog
    const tagList = [
        {tag: "גדול", state: false},
        {tag: "קטן", state: false},
        {tag: "בינוני", state: false},
        {tag: "זכר", state: false},
        {tag: "נקבה", state: false},
        {tag: "עונה לשמו", state: false},
        {tag: "ביישן", state: false},
        {tag: "פחדן", state: false},
        {tag: "חברותי", state: false},
        {tag: "תוקפני", state: false},
        {tag: "נבחן", state: false},
        {tag: "שקט", state: false},
        {tag: "מבוגר", state: false},
        {tag: "גור", state: false},
        {tag: "עם קולר", state: false},
        {tag: "ללא קולר", state: false},
        {tag: "חירש", state: false},
        {tag: "עיוור", state: false}
    ];


    //
    // const modalChipHandler = (index) => {
    //     setModalTags(prevStates => {
    //         var temp = [...prevStates]
    //         temp[index].state = !temp[index].state
    //         return temp
    //     });
    // }

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



    // init tags with previous values if reached this page from an edit Report
    const initSelectedTagList = route.params.edit ? prevPoster.tagList.map(({tag}) => ({tag: tag, state: false})) : []
    const initModalTagList = route.params.edit ?
        tagList.filter((item) => !initSelectedTagList.some(e => e.tag === item.tag)) : tagList
    const [modalTags, setModalTags] = React.useState(initModalTagList);
    const [selectedTags, setSelectedTags] = React.useState(initSelectedTagList);


    // the modal of the tags where you can choose how to describe the dog
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
    const db = fireStoreDB;

    const initDescription = route.params.edit ? prevPoster.description : ''
    const initName = route.params.edit ? prevPoster.name : ''

    const [initializedPhone, setInitializedPhone] = React.useState(false);
    let initPhone = ""
    if (route.params.edit && !initializedPhone) {
        initPhone = prevPoster.phoneNumber
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
    const [nameText, setName] = React.useState(initName);

    const [phoneText, setPhone] = React.useState(initPhone);
    const [time, setTime] = React.useState(false);
    const [selectedHours, setSelectedHours] = React.useState(0);
    const [selectedMinutes, setSelectedMinutes] = React.useState(0);

    const getCurrentTime = () => {
        if (time) {
            let today = new Date();
            let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
            let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
            return hours + ':' + minutes;
        }
    }


    // here we need to handle all the data we have got in this 3 levels of upload
    // we add the time, date and more details that need to be shown on the report screen
    const nextScreen = async () => {
        if(phoneRegExp.test(phoneText) === true && phoneText.length === 10 && nameText.length !==0) {


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
            let today = route.params.edit ? prevPoster.date : dd + '/' + mm + '/' + yyyy;
            let time = route.params.edit ? prevPoster.time : getCurrentTime();
            const selectedImage = route.params.edit ? prevPoster.image : route.params.image
            const name = user.displayName

            let tempLocation = route.params.location
            const hash = geofire.geohashForLocation([tempLocation.latitude, tempLocation.longitude])
            const location = {
                latitude: tempLocation.latitude,
                longitude: tempLocation.longitude,
                geohash: hash
            }
            const [addressResponse] = await reverseGeocodeAsync(tempLocation)
            const address = `${addressResponse.street} ${addressResponse.streetNumber}, ${addressResponse.city}`;
            let imagePath = route.params.edit ? prevPoster.imagePath : ""
            const dbPoster = new Poster(selectedImage, "", location, address, today, time, plainTags, descriptionText, nameText, '', phoneText, name, user.uid)
            const sendPoster = new Poster(selectedImage, "", location, address, today, time, plainTags, descriptionText, nameText, '', phoneText, name, user.uid)
            const db = fireStoreDB;

            // if we reached from an edit Report different way to handle data
            if (route.params.edit) {
                // if the prevPoster was changed, update the prevPoster page
                if (deepDiffer(sendPoster, prevPoster)) {
                    const docRef = await setDoc(doc(db, "Posters", route.params.ref).withConverter(posterConverter), dbPoster).then(() => {
                        console.log("updated Poster page")
                    }).catch(error => {
                        console.log(error)
                    });
                }
                navigation.pop()
                navigation.pop()
                navigation.pop()
                navigation.navigate("AdPage", {data: sendPoster, ref: route.params.ref})
            } else {
                const image = await uploadImageAsync(selectedImage, "Posters")
                dbPoster.image = image.link
                dbPoster.imagePath = image.path
                const docRef = await addDoc(collection(db, "Posters").withConverter(posterConverter), dbPoster)

                // add poster page id to user posters
                await updateDoc(doc(db, "Users", user.uid), {posters: arrayUnion(docRef.id)}).then(() => {
                    navigation.pop()
                    navigation.pop()
                    navigation.pop()
                    navigation.navigate("AdPage", {data: sendPoster, ref: docRef.id})
                }).catch(error => {
                    console.log(error)
                });
            }
        }
        else{
            if(!(phoneRegExp.test(phoneText) === true && phoneText.length == 10) ){
                setCorrectPhone(false)
            }
            if(nameText.length==0){
                setCorrectDogName(false)

            }
        }
    }
    // before letting the user submit his poster we need to validate that the phone is real number and that the dogs' name is valid
    if (phoneRegExp.test(phoneText) === true && phoneText.length == 10 && correctPhone === false){
        setCorrectPhone(true)
    }
    if (nameText.length!==0 && correctDogName === false){
        setCorrectDogName(true)
    }

    return (
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
                    {/*<View marginHorizontal = "7.5%" marginTop = "2.5%" >*/}

                    {/*    <Text style = {styles.textFound}>תיאור הכלב: </Text></View>*/}
                    <View style={styles.dogNameContainer}>

                        <Text style={Nofar_styles.TinyButtonTitleBlack}>שם הכלב: </Text></View>

                    <View style={styles.nameContainer}>
                        <TextInput
                            style={styles.nameOfDog}
                            dense={false}
                            value={nameText}
                            onChangeText={setName}
                            mode={'outlined'}
                            multiline={true}
                            activeUnderlineColor="#000000"
                            activeOutlineColor="#000000"
                        />
                    </View >
                    {!correctDogName &&
                    <View style={styles.descriptionTextContainer}>

                        <Text style={Nofar_styles.TinyButtonTitleRed}>אנא הכנס שם</Text></View>}
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
                            <Text style={Nofar_styles.TinyButtonTitle}> הוספת תגיות לתיאור הכלב</Text>
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
                    <View marginTop = "4%">
                        <View style={styles.descriptionTextContainer}>

                            <Text style={Nofar_styles.TinyButtonTitleBlack}>פרטים נוספים: </Text></View>
                        <View style={styles.descriptionContainer}>

                            <TextInput
                                style={styles.inDescription}
                                dense={false}
                                value={descriptionText}
                                onChangeText={setDescription}
                                mode={'outlined'}
                                multiline={true}
                                activeUnderlineColor="#000000"
                                activeOutlineColor="#000000"
                            />
                        </View>
                        <View style={styles.checkboxContainer}>
                            <View>
                                <Text style={Nofar_styles.TinyButtonTitleBlack}>טלפון:</Text>
                            </View>
                        </View>
                        <View style={styles.phoneContainer}>
                            <TextInput
                                dense={false}
                                keyboardType = 'numeric'
                                value={phoneText}
                                onChangeText={setPhone}
                                mode={'outlined'}
                                activeUnderlineColor="#000000"
                                activeOutlineColor="#000000"
                            />
                        </View>
                        {!correctPhone &&
                            <View style={styles.dogNameContainer}>

                                <Text style={Nofar_styles.TinyButtonTitleRed}>אנא הכנס מספר טלפון תקין</Text></View>}
                    </View>
                    {/*<View>*/}
                    {/*<TimePicker*/}
                    {/*    selectedHours={selectedHours}*/}
                    {/*    //initial Hourse value*/}
                    {/*    selectedMinutes={selectedMinutes}*/}
                    {/*    //initial Minutes value*/}
                    {/*    onChange={(hours, minutes) => {*/}
                    {/*        setSelectedHours(hours);*/}
                    {/*        setSelectedMinutes(minutes);*/}
                    {/*    }}*/}
                    {/*/></View>*/}
                    <TouchableOpacity
                        onPress={nextScreen}

                        style={styles.proceedButton}>
                        <Text style={Nofar_styles.TinyButtonTitle}>העלאת מודעה</Text>

                    </TouchableOpacity>
                </View>
            </Provider>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    button: {
        marginBottom: "1%",
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
        width: Dimensions.get("window").width * 0.85,
    },
    nameContainer: {
        marginRight: "7.5%",
        marginLeft: "7.5%",
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.85,
    },
    phoneContainer: {
        marginRight: "7.5%",
        marginLeft: "7.5%",

        justifyContent: "center",
        width: Dimensions.get("window").width * 0.85,
    },
    checkboxContainer: {
        marginHorizontal: "7.5%",
        flexDirection: "row",
        marginTop: "5%",
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
        textDecorationLine: 'underline',

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
        paddingTop: "2.5%",
        flexDirection: "row",
    },
    dogNameContainer: {
        marginHorizontal: "7.5%",
        flexDirection: "row",
        marginTop: "5%"
    },
    descriptionTextContainer: {
        marginHorizontal: "7.5%",
        flexDirection: "row",
    },



    nameOfDog:{
        marginBottom: "5%",

    }
});
