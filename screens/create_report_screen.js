import * as React from 'react';
import {Modal, Portal, Button, Provider, Chip, Headline, TextInput, Text} from 'react-native-paper';
import {View, StyleSheet, Image} from 'react-native'
import Report from '../data_classes/report'


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
                <Modal visible={visibleTag} onDismiss={modalConfirmPressHandler} contentContainerStyle={styles.modal}>
                    <View><Headline>בחר תגיות:</Headline></View>
                    <View style={styles.chips}>
                        {
                            modalTags.map((item, index) => (
                                <Chip key={index} selected={modalTags[index].state}
                                      onPress={() => modalChipHandler(index)}>{item.tag}</Chip>
                            ))
                        }
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <Button compact={true} style={styles.modalButton}
                                onPress={modalConfirmPressHandler}>Confirm</Button>
                    </View>
                </Modal>
                {/*Details*/}
                <Modal visible={visibleDetails} onDismiss={hideDescriptionModal}
                       contentContainerStyle={styles.modal}>
                    <View><Headline>תיאור:</Headline></View>
                    <View style={styles.descriptionContainer}>
                        <TextInput
                            dense={false}
                            placeholder={'הוסף תיאור...'}
                            value={descriptionText}
                            onChangeText={setDescription}
                            mode={'outlined'}
                            multiline={true}
                            style={{height: undefined}}
                        />
                    </View>
                    <View style={{paddingVertical: 16}}>
                        <Headline>מיקום:</Headline>

                        <Button mode={'contained'}>עדכון מיקום</Button>
                    </View>

                    <View style={styles.modalButtonContainer}>
                        <Button compact={true} style={styles.modalButton}
                                onPress={modalConfirmPressHandler}>אישור</Button>
                    </View>

                </Modal>
            </Portal>

            <View style={styles.container}>

                <View style={styles.pictureContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.card}/>
                </View>
                <Headline>תגיות:</Headline>
                <View style={styles.chips}>
                    {
                        selectedTags.map((item, index) => (
                            <Chip key={index} icon={"close"} selected={false}
                                  onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                        ))
                    }
                </View>

                <Button comapct={true} style={{marginTop: 8}} onPress={showTagModal}>
                    הוסף תגיות
                </Button>

                <Button comapct={true} onPress={showDescriptionModal}>
                    הוסף פרטים
                </Button>

                <Button mode={"contained"} style={{marginBottom: 30}} onPress={reportConfirmHandler}>
                    אישור
                </Button>
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
