import * as React from "react";
import {
    Modal,
    Portal,
    Button,
    Chip,
    FAB,
    TextInput,
    Text, Provider,
} from "react-native-paper";
import {View, ScrollView, TouchableOpacity, Image} from "react-native";
import {Nofar_styles} from "../utils/Nofar_style";
import {stylesPoster} from "./stylePosterCreate";
import * as ImagePicker from "expo-image-picker";
import Poster, {posterConverter} from "../../data_classes/poster";
import {useContext} from "react";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import {collection, doc, updateDoc, getFirestore, addDoc, arrayUnion} from "firebase/firestore";

export default function PosterPostingComponent({navigation}) {
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

        setSelectedImage(pickerResult.uri);
    };

    let imagePicker = (
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
                        source={{uri: selectedImage}}
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
    const [descriptionText, setDescription] = React.useState("");
    const [nameText, setName] = React.useState("");

    const onChangeText = (text) => setText(text);

    const hasErrors = () => {
        return !text.includes("@");
    };

    //---------------------- Uploading Poster handler ----------------------


    const {user} = useContext(AuthenticatedUserContext);
    const posterConfirmHandler = async () => {

        // get current date
        let date = new Date()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        let today = dd + '/' + mm + '/' + yyyy;

        // create poster
        const poster = new Poster(selectedImage, "", today, selectedTags, descriptionText, nameText, user.uid)
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "Posters").withConverter(posterConverter), poster)

        //update user posters
        await updateDoc(doc(db, "Users", user.uid), {posters: arrayUnion(docRef)}).then(() => {
            navigation.pop()
            navigation.navigate("AdPage", {poster: poster, ref:docRef})
        });
    }

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

                    <View style={{...stylesPoster.chips, marginLeft: "2.8%"}}>
                        {selectedTags.map((item, index) => (
                            <Chip
                                key={index}
                                icon={"close"}
                                selected={false}
                                onPress={() => selectedTagPressHandler(item.tag)}
                                style={{...Nofar_styles.chips, marginTop: "5%"}}
                            >
                                {item.tag}
                            </Chip>
                        ))}
                    </View>

                    <View style={stylesPoster.detailsContainer}>
                        <View style={{...Nofar_styles.actionInput, paddingVertical: "5%"}}>
                            <TextInput
                                dense={false}
                                placeholder={"שם הכלב"}
                                value={nameText}
                                onChangeText={setName}
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
                        <View style={{...Nofar_styles.actionInput, paddingBottom: "5%"}}>
                            <TextInput
                                dense={false}
                                placeholder={"תיאור"}
                                value={descriptionText}
                                onChangeText={setDescription}
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

                    </View>

                    <View style={stylesPoster.confirmBTContainer}>
                        <Button mode={"contained"} style={Nofar_styles.BigButton} onPress={posterConfirmHandler}>
                            <Text style={Nofar_styles.BigButtonText}>אישור</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </Provider>
    )
        ;
}
