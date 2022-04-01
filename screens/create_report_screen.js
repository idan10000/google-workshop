import * as React from 'react';
import {Modal, Portal, Text, Button, Provider, Card, Chip, Headline, FAB, TextInput} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image, I18nManager, Dimensions} from 'react-native'
import * as ImagePicker from 'expo-image-picker';


const ReportCreationScreen = ({image}) => {


    //---------------------- Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    const [visibleDetails, setVisibleDetails] = React.useState(false);
    const showDescriptionModal = () => setVisibleDetails(true);
    const hideDescriptionModal = () => setVisibleDetails(false);

    //---------------------- Tag Selection ----------------------
    const tagList = [
        {tag: "Shy", state: false},
        {tag: "Friendly", state: false},
        {tag: "Aggressive", state: false}]

    const [modalTags, setModalTags] = React.useState(tagList);
    const [selectedTags, setSelectedTags] = React.useState([]);


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
                    <View style={{paddingVertical: 16}}>
                        <Headline>שם הכלב:</Headline>

                        <TextInput dense={true} placeholder={'שם הכלב...'} multiline={true}
                                   style={{height: undefined}}/>
                    </View>
                    <View><Headline>תיאור:</Headline></View>
                    <View style={styles.descriptionContainer}>
                        <TextInput
                            dense={false}
                            placeholder={'הוסף תיאור...'}
                            mode={'outlined'}
                            multiline={true}
                            style={{height: undefined}}
                        />
                    </View>
                    <View style={{paddingVertical: 16}}>
                        <Headline>מיקום:</Headline>

                        <Button mode={'contained'}>עדכן מיקום:</Button>
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

                <View style={styles.chips}>
                    {
                        selectedTags.map((item, index) => (
                            <Chip key={index} icon={"close"} selected={false}
                                  onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                        ))
                    }
                </View>

                <Button comapct={true} style={{marginTop: 30}} onPress={showTagModal}>
                    הוסף תגיות
                </Button>

                <Button comapct={true} onPress={showDescriptionModal}>
                    הוסף פרטים
                </Button>

                <Button mode={"contained"} style={{marginBottom: 30}}>
                    אישור
                </Button>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
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
        flex:1

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
