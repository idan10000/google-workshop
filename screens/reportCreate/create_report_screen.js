import * as React from 'react';
import {Modal, Portal, Button, Provider, Chip, Headline, TextInput} from 'react-native-paper';
import {View, StyleSheet, Image, Text} from 'react-native'
import Report, {reportConverter} from '../../data_classes/report'
import {stylesPoster} from "../posterCreate/stylePosterCreate";
import {Nofar_styles} from "../utils/Nofar_style";
import {addDoc, arrayUnion, collection, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {useContext} from "react";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {fireStoreDB, uploadImageAsync} from "../../shared_components/firebase";


// Expected input from previous screen is:
// edit - if the report is being edited (TRUE) or it is a new report (FALSE)
// report - if the report is being edited this is the values it had, null otherwise
// ref - the DB page reference to where the report was written to
const ReportCreationScreen = ({route, navigation}) => {

    console.log("opened report screen")
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


    // init tags with previous values if reached this page from an edit report
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

        const dbReport = new Report(image, "", location, today, plainTags, descriptionText, user.uid) // report to upload to DB
        const sendReport = new Report(image, "", location, today, plainTags, descriptionText, user.uid) // report to send to the report page

        const db = fireStoreDB;

        // if we reached from an edit report
        if (route.params.edit) {
            // if the report was changed, update the report page
            if (deepDiffer(sendReport, report)) {
                const imageAndPath = await uploadImageAsync(image,"Reports")
                dbReport.image = imageAndPath.link
                dbReport.imagePath = imageAndPath.path
                const docRef = await setDoc(doc(db,"Reports",route.params.ref).withConverter(reportConverter), dbReport).then(() => {
                    console.log("updated report page")
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
            console.log("uploaded report")
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
                        <Button
                            comapct={false}
                            style={Nofar_styles.TinyButton}
                            onPress={modalConfirmPressHandler}
                        >
                            <Text style={Nofar_styles.TinyButtonTitle}>אישור</Text>
                        </Button>
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

                        <Button
                            comapct={false}
                            style={Nofar_styles.TinyButton}
                        >
                            <Text style={Nofar_styles.TinyButtonTitle}>עדכון מיקום</Text>
                        </Button>
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <Button
                            comapct={false}
                            style={Nofar_styles.SmallButton}
                            onPress={hideDescriptionModal}
                        >
                            <Text style={Nofar_styles.SmallButtonTitle}>אישור</Text>
                        </Button>
                    </View>

                </Modal>
            </Portal>

            <View style={Nofar_styles.container}>

                <View style={styles.pictureContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.card}/>
                </View>

                <View style={stylesPoster.addTagsBTContainer}>
                    <Button
                        comapct={false}
                        style={Nofar_styles.TinyButton}
                        onPress={showTagModal}
                    >
                        <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות</Text>
                    </Button>
                    <Button mode={"contained"}
                            style={Nofar_styles.TinyButton}
                            onPress={showDescriptionModal}
                    >
                        <Text style={Nofar_styles.TinyButtonTitle}>עדכון פרטים</Text>
                    </Button>
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
                    <Button mode={"contained"} style={Nofar_styles.BigButton} onPress={reportConfirmHandler}>
                        <Text style={Nofar_styles.BigButtonText}>אישור</Text>
                    </Button>
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
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
