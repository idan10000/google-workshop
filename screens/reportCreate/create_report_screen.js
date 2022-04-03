import * as React from 'react';
import {Modal, Portal, Button, Provider, Chip, Headline, TextInput} from 'react-native-paper';
import {View, StyleSheet, Image, Text} from 'react-native'
import Report from '../../data_classes/report'
import {stylesPoster} from "../posterCreate/stylePosterCreate";
import {Nofar_styles} from "../utils/Nofar_style";


const ReportCreationScreen = ({route, navigation}) => {

    console.log("opened report screen")
    let report = route.params.report

    //---------------------- Tag Selection Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    const tagList = [
        {tag: "Shy", state: false},
        {tag: "Friendly", state: false},
        {tag: "Aggressive", state: false}]


    const initSelectedTagList = route.params.edit ? report.tagList.map(({tag}) => ({tag: tag, state: false})) : []
    console.log(initSelectedTagList)
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

    const reportConfirmHandler = () => {
        // let date = new Date();
        // let newReport = new Report(image, location, date, selectedTags, descriptionText)
        // console.log(newReport)
        let date = route.params.edit ? report.date : new Date().getDate()
        navigation.pop()
        navigation.navigate("ReportPage", {report: new Report(image, location, date, selectedTags, descriptionText)})
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
                        <Text style={Nofar_styles.SmallTitle}>בחר תגיות:</Text>
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
                    <View style={stylesPoster.modalButtonContainer}>
                        <Button
                            compact={true}
                            style={stylesPoster.modalButton}
                            onPress={modalConfirmPressHandler}
                        >
                            Confirm
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
                    <View style={{paddingVertical: 16}}>
                        <View><Text style={Nofar_styles.SmallTitle}>מיקום:</Text></View>

                        <Button
                            comapct={false}
                            style={Nofar_styles.TinyButton}
                        >
                            <Text style={Nofar_styles.TinyButtonTitle}>עדכון מיקום</Text>
                        </Button>
                    </View>

                    <Button
                        comapct={false}
                        style={Nofar_styles.SmallButton}
                        onPress={hideDescriptionModal}
                    >
                        <Text style={Nofar_styles.SmallButtonTitle}>אישור</Text>
                    </Button>

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

                <View style={stylesPoster.chips}>
                    {
                        selectedTags.map((item, index) => (
                            <Chip key={index}
                                  icon={"close"}
                                  selected={false}
                                  style={Nofar_styles.chips}
                                  onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                        ))
                    }
                </View>

                <View style={stylesPoster.confirmBTContainer}>
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
