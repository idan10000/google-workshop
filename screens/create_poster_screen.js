import * as React from 'react';
import {Modal, Portal, Text, Button, Provider, Card, Chip, Headline, FAB, TextInput, Subheading, HelperText} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image, I18nManager, ScrollView, Dimensions} from 'react-native'
import * as ImagePicker from 'expo-image-picker';


const PosterPostingComponent = () => {


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

    //---------------------- Image Picker ----------------------
    const [selectedImage, setSelectedImage] = React.useState(null);
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({localUri: pickerResult.uri});
    };


    var imagePicker = <TouchableOpacity style={styles.addImageContainer} onPress={openImagePickerAsync}>
        <Text style={styles.addImageText}>בחר תמונה</Text>
    </TouchableOpacity>

    if (selectedImage !== null) {

        imagePicker =
            <View style={styles.pictureContainer}>
                <Image
                    source={{uri: selectedImage.localUri}}
                    style={styles.card}
                />
            </View>

    }

    const [text, setText] = React.useState('');

    const onChangeText = text => setText(text);

    const hasErrors = () => {
        return !text.includes('@');
    };


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
            </Portal>

            <ScrollView>
            <View style={styles.container}>

                {imagePicker}
                <View style={styles.fabContainer}>
                    <FAB
                        style={styles.fab}
                        small
                        icon={"camera-plus"}
                        onPress={openImagePickerAsync}
                    />
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

                <Button comapct={true} style={styles.addTagsBT} onPress={showTagModal}>
                    הוסף תגיות
                </Button>


                <View style={styles.detailsContainer}>
                    <View style={{paddingVertical: 16}}>
                        <Headline>שם הכלב:</Headline>

                        <TextInput dense={true} placeholder={'שם הכלב...'}
                                   error={hasErrors}
                                   style={{height: undefined}}
                                   value={text}
                                   onChangeText={onChangeText}

                        />
                        <HelperText type="error" visible={hasErrors()}>
                            שם הכלב צריך להכיל רק אותיות
                        </HelperText>
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

                        <Button mode={'contained'}>עדכן מיקום אחרון</Button>
                    </View>
                </View>


                <Button mode={"contained"} style={{marginBottom: 30}}>
                    אישור
                </Button>
            </View>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal:8,
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
        flex: 1,
        height: Dimensions.get('window').height / 2
    },
    addImageText: {
        textAlign: "center",
        fontSize: 24
    },
    pictureContainer: {
        flex: 3,
        justifyContent: "center",
        alignContent: "center",
        height: Dimensions.get('window').height / 2

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
    descriptionContainer: {},
    addTagsBT: {

    }
});

export default PosterPostingComponent;
