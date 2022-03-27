import * as React from 'react';
import {Modal, Portal, Text, Button, Provider, Card, Chip} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';


const PosterPostingComponent = () => {

    //---------------------- Modal ----------------------
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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
        setSelectedTags((prevSelected) =>{
           return prevSelected.concat(modalTags.filter(modalTags => modalTags.state));
        });
        setModalTags((prevTags) => {
            return prevTags.filter(prevTags => !prevTags.state)
        });
        hideModal();
    }

    const selectedTagPressHandler = (tag) => {
        setModalTags(prevTags => (prevTags.concat({tag:tag, state:false})))
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
        <Text style={styles.addImageText}>Pick a picture</Text>
    </TouchableOpacity>

    if (selectedImage !== null) {

        imagePicker =
            <View style={styles.pictureContainer}>
                <Image
                    source={{  uri: selectedImage.localUri }}
                    style={styles.card}
                />
            </View>

    }


    return (
        <Provider>
            {/*Modal (pop up screen) for selecting the tags describing the dog*/}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <View style={styles.chips}>
                        {
                            modalTags.map((item, index) => (
                                <Chip key={index} selected={modalTags[index].state}
                                      onPress={() => modalChipHandler(index)}>{item.tag}</Chip>
                            ))
                        }
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <Button compact={true} style={styles.modalButton} onPress={modalConfirmPressHandler}>Confirm</Button>
                    </View>
                </Modal>
            </Portal>

            <View style={styles.container}>

                {imagePicker}

                <View style={styles.chips}>
                    {
                        selectedTags.map((item, index) => (
                            <Chip key={index} icon={"close"} selected={false}
                                  onPress={() => selectedTagPressHandler(item.tag)}>{item.tag}</Chip>
                        ))
                    }
                </View>

                <Button comapct={true} style={{marginTop: 30}} onPress={showModal}>
                    Add tags
                </Button>

                <Button mode={"contained"} style={{marginBottom: 30}} onPress={openImagePickerAsync}>
                    Submit
                </Button>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 4,
        flex: 1
    },
    stretch: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderColor: 'red',
        borderWidth: 5,
        resizeMode: 'contain',
    },
    chips: {
        flexDirection: 'row',
        overflow: "hidden",
        flexWrap: "wrap"
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
        marginTop:30,
        flex:3,
        justifyContent: "center",
        alignContent:"center",

    },
    card: {
        resizeMode:"contain",
        flex:1

    }, modalButtonContainer: {
        justifyContent: "center",
        alignContent:"center",
        flexDirection:"row"
    },
    modalButton: {

    },


});

export default PosterPostingComponent;
