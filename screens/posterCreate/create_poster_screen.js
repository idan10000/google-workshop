import * as React from "react";
import {
    Modal,
    Portal,
    Button,
    Chip,
    Headline,
    FAB,
    TextInput,
    HelperText,
    Text, Provider,
} from "react-native-paper";
import {View, ScrollView, TouchableOpacity, Image} from "react-native";
import {Nofar_styles} from "../utils/Nofar_style";
import {stylesPoster} from "./stylePosterCreate";
// import * as util from "./utilsPosterCreate";
import * as ImagePicker from "expo-image-picker";

export default function PosterPostingComponent() {
    //---------------------- Modal ----------------------
    const [visibleTag, setVisibleTag] = React.useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    //---------------------- Tag Selection ----------------------
    const tagList = [
        {tag: "ביישן", state: false},
        {tag: "חברותי", state: false},
        {tag: "אגרסיבי", state: false},
    ];

    const [modalTags, setModalTags] = React.useState(tagList);
    const [selectedTags, setSelectedTags] = React.useState([]);

    const modalChipHandler = (index) => {
        setModalTags((prevStates) => {
            var temp = [...prevStates];
            temp[index].state = !temp[index].state;
            return temp;
        });
    };

    const modalConfirmPressHandler = () => {
        setSelectedTags((prevSelected) => {
            return prevSelected.concat(
                modalTags.filter((modalTags) => modalTags.state)
            );
        });
        setModalTags((prevTags) => {
            return prevTags.filter((prevTags) => !prevTags.state);
        });
        hideTagModal();
    };

    const selectedTagPressHandler = (tag) => {
        setModalTags((prevTags) => [...prevTags, {tag: tag, state: false}]);
        setSelectedTags((prevSelected) =>
            prevSelected.filter((prevSelected) => prevSelected.tag !== tag)
        );
    };

    //---------------------- Image Picker ----------------------
    const [selectedImage, setSelectedImage] = React.useState(null);
    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({uri: pickerResult.uri});
    };

    var imagePicker = (
        <View style={{...Nofar_styles.mainImage, borderWidth: 1, alignSelf: 'center'}}>
            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={Nofar_styles.SmallButton}
            >
                <Text style={Nofar_styles.SmallButtonTitle}>בחר תמונה</Text>
            </TouchableOpacity>
        </View>
    );

    if (selectedImage !== null) {
        imagePicker = (
            <View>
                <View style={{...Nofar_styles.mainImage, alignSelf: 'center'}}>
                    <Image
                        style={Nofar_styles.mainImage}
                        source={selectedImage}
                    />
                </View>
                <View style={stylesPoster.fabContainer}>
                    <FAB
                        style={stylesPoster.fab}
                        small
                        icon={"image-edit"}
                        onPress={openImagePickerAsync}
                    />
                </View>
            </View>
        );
    }

    const [text, setText] = React.useState("");

    const onChangeText = (text) => setText(text);

    const hasErrors = () => {
        return !text.includes("@");
    };

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
                        <Headline>בחר תגיות:</Headline>
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
            </Portal>

            <View style={Nofar_styles.container}>
                <ScrollView>
                        {imagePicker}

                        <View style={stylesPoster.addTagsBTContainer}>
                            <Button
                                comapct={false}
                                style={Nofar_styles.TinyButton}
                                onPress={showTagModal}
                            >
                                <Text style={Nofar_styles.TinyButtonTitle}>הוסף תגיות</Text>
                            </Button>
                            <Button mode={"contained"} style={Nofar_styles.TinyButton}>
                                <Text style={Nofar_styles.TinyButtonTitle}>עדכון מיקום</Text>
                            </Button>
                        </View>

                        <View style={stylesPoster.chips}>
                            {selectedTags.map((item, index) => (
                                <Chip
                                    key={index}
                                    icon={"close"}
                                    selected={false}
                                    onPress={() => selectedTagPressHandler(item.tag)}
                                    style={Nofar_styles.chips}

                                >
                                    {item.tag}
                                </Chip>
                            ))}
                        </View>

                        <View style={stylesPoster.detailsContainer}>
                            <View style={{...Nofar_styles.actionInput,paddingBottom:"5%"}}>
                                <TextInput
                                    dense={false}
                                    placeholder={"שם הכלב"}
                                    // value={state.fname}
                                    // onChangeText={handleChange}
                                    mode="outlined"
                                    activeUnderlineColor="#000000"
                                    activeOutlineColor="#000000"
                                    multiline={true}
                                    style={{backgroundColor: "#D3D3D3"}}
                                />
                            </View>

                            {/* <HelperText type="error" visible={hasErrors("name")}>
              <Text style={edit_styles.error}>טעות בתיאור הטקסט</Text>
            </HelperText> */}
                            <View style={{...Nofar_styles.actionInput,paddingBottom:"5%"}}>
                                <TextInput
                                    dense={false}
                                    placeholder={"תיאור"}
                                    // value={state.fname}
                                    // onChangeText={handleChange}
                                    mode="outlined"
                                    activeUnderlineColor="#000000"
                                    activeOutlineColor="#000000"
                                    multiline={true}
                                    style={{height: 200, backgroundColor: "#D3D3D3"}}
                                />
                            </View>
                            {/* <HelperText type="error" visible={hasErrors("name")}>
              <Text style={edit_styles.error}>טעות בתיאור הטקסט</Text>
            </HelperText> */}

                        </View>

                        <View style={stylesPoster.confirmBTContainer}>
                            <Button mode={"contained"} style={Nofar_styles.BigButton}>
                                <Text style={Nofar_styles.BigButtonText}>אישור</Text>
                            </Button>
                        </View>
                </ScrollView>
            </View>
        </Provider>
    )
        ;
}
