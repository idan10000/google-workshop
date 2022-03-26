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

    const [tags, toggleState] = React.useState(tagList);

    const chipPressHandler = (index) => {
        toggleState(prevStates => {
            var temp = [...prevStates]
            temp[index].state = !temp[index].state
            return temp
        });
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
                            tags.map((item, index) => (
                                <Chip key={index} icon="information" selected={tags[index].state}
                                      onPress={() => chipPressHandler(index)}>{item.tag}</Chip>
                            ))
                        }
                    </View>
                </Modal>
            </Portal>

            <View style={styles.container}>

                {imagePicker}

                <Button style={{marginTop: 30}} onPress={showModal}>
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
        flex:1,
        justifyContent: "center",
        alignContent:"center",

    },
    card: {
        resizeMode:"contain",
        flex:1

    },

});

export default PosterPostingComponent;
