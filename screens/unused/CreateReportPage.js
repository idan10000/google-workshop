import * as React from 'react';
import {Modal, Portal, Button, Provider, Chip, Headline, TextInput} from 'react-native-paper';
import {TouchableOpacity, View, StyleSheet, Image, Text, ImageBackground, ImageBackgroundComponent} from 'react-native'
import Report, {reportConverter} from '../../data_classes/Report'
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";
import {Nofar_styles} from "../../styles/NofarStyle";
import {addDoc, arrayUnion, collection, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {useContext} from "react";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/Firebase";
import Icon from 'react-native-vector-icons/Entypo';


// Expected input from previous screen is:
// edit - if the Report is being edited (TRUE) or it is a new Report (FALSE)
// Report - if the Report is being edited this is the values it had, null otherwise
// ref - the DB page reference to where the Report was written to
const ReportCreationScreen = ({route, navigation}) => {

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
    const [visibleDetails, setVisibleDetails] = React.useState(false);
    const showDescriptionModal = () => setVisibleDetails(true);
    const hideDescriptionModal = () => setVisibleDetails(false);

    const initDescription = route.params.edit ? report.description : ''
    const [descriptionText, setDescription] = React.useState(initDescription);

    const [location, setLocation] = React.useState('');

    const {user} = useContext(AuthenticatedUserContext);
    const reportConfirmHandler = async () => {
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

    //---------------------- Create / Edit setup ----------------------

    let image = route.params.edit ? report.image : route.params.image

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../../assets/new_background.png')}>
        <Provider>
            {/*Modal (pop up screen) for selecting the tags describing the dog*/}
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
                <Modal visible={visibleDetails} onDismiss={hideDescriptionModal}
                       contentContainerStyle={stylesPoster.modal}>
                    <View><Text style={Nofar_styles.SmallTitle}>תיאור:</Text></View>
                    <View style={styles.descriptionContainer}>
                        <TextInput
                            dense={false}
                            placeholder={'הוסף תיאור...'}
                            value={descriptionText}
                            onChangeText={setDescription}
                            mode={'outlined'}
                            multiline={true}
                        />
                    </View>
                    <View style={{paddingVertical: "5%"}}>

                        <TouchableOpacity
                            style={Nofar_styles.TinyButton}
                        >
                            <Text style={Nofar_styles.TinyButtonTitle}>עדכון מיקום</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <TouchableOpacity
                            style={Nofar_styles.SmallButton}
                            onPress={hideDescriptionModal}
                        >
                            <Text style={Nofar_styles.SmallButtonTitle}>אישור</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </Portal>

            <View style={Nofar_styles.container}>

                <View style={styles.pictureContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.card}/>
                </View>

                <View style = {styles.lastSeen}>
                    <Icon name="location-pin" size={24} color ="#5C4C3D"  />
                    <TouchableOpacity><Text  style={{color:"#5C4C3D", fontSize:16}} lineHeight="20" fontWeight= "500" textAlign= "center">החלוצים 43, תל אביב</Text></TouchableOpacity>
                </View>

                <View style={stylesPoster.addTagsBTContainer}>
                    <TouchableOpacity
                        // comapct={false}
                        style={Nofar_styles.TinyButton}
                        onPress={showTagModal}
                    >
                        <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={Nofar_styles.TinyButton}
                            onPress={showDescriptionModal}
                    >
                        <Text style={Nofar_styles.TinyButtonTitle}>עדכון פרטים</Text>
                    </TouchableOpacity>
                </View>

                <View style={{...stylesPoster.chips, marginLeft: "2.8%"}}>
                    {
                        selectedTags.map((item, index) => (
                            <Chip key={index}
                                  icon={"close"}
                                  selected={false}
                                  style={{...Nofar_styles.chips, marginTop: "5%"}}
                                  onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                        ))
                    }
                </View>

                <View style={{...stylesPoster.confirmBTContainer, paddingTop: "5%"}}>
                    <TouchableOpacity  style={Nofar_styles.BigButton} onPress={reportConfirmHandler}>
                        <Text style={Nofar_styles.BigButtonText}>אישור</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Provider>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
    lastSeen: {
        flexDirection:"row",
        alignItems:"center",
        // marginHorizontal: "5%",
        justifyContent:"center",
        margin:"3%"
      },
    container: {
        padding: 4,
        flex: 1,
    },
    chips: {
        flexDirection: 'row',
        overflow: "hidden",
        flexWrap: "wrap",
        paddingTop: 16,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    },
    addImageContainer: {
        justifyContent: "center",
        borderWidth: 1,
        flex: 1
    },
    addImageText: {
        textAlign: "center",
        fontSize: 24
    },
    pictureContainer: {
        marginTop: 30,
        flex: 3,
        justifyContent: "center",
        alignContent: "center",

    },
    card: {
        resizeMode: "contain",
        flex: 1

    }, modalButtonContainer: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    modalButton: {},
    fabContainer: {
        flexDirection: 'row'
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16
    },
    descriptionContainer: {}
});

export default ReportCreationScreen;
