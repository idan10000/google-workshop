import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";

export default function HomeScreen({navigation}) {


    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            navigation.navigate('ReportCreation',{image:result.uri, edit:false})
        }
    }

    const createPosterPressHandler = () => {
        navigation.navigate('CreateAd',{edit:false})
    }


    return (
        // <ScrollView style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/background_design.png')}>
            <View style={styles.BigButtonView}>
                <Button
                    mode='contained'
                    icon='camera'
                    style={styles.BigButton}
                    onPress={openCamera}
                    labelStyle={styles.BigButtonText}>
                    מצאתי כלב!
                </Button>
            </View>
            <View style={styles.SmallButtonsView}>
                <View style={styles.SmallButtonView}>
                    <Button
                        mode='outlined'
                        icon='image'
                        style={styles.SmallButton}
                        onPress={() => {signOut(getAuth()).then(() => {})}}
                        labelStyle={styles.SmallButtonTitle}>
                        העלאה מגלריה
                    </Button>
                </View>

                <View style={styles.SmallButtonView}>
                    <Button
                        mode='outlined'
                        style={styles.SmallButton}
                        onPress={createPosterPressHandler}
                        labelStyle={styles.SmallButtonTitle}>
                        יצירת מודעה
                    </Button>
                </View>
            </View>
            </ImageBackground>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#BBB988",
        backgroundColor:"white"
    },


    //   small button
    SmallButtonsView: {
        marginTop:"25%",
    },
    SmallButtonView: {
        alignSelf:"center",
    },
    SmallButtonTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
    },
    SmallButton: {
        width:Dimensions.get('window').width * 0.65,
        height: Dimensions.get('window').height * 0.05,
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#816A55",
    },
    BigButtonView: {
        alignSelf:"center",
    },
    BigButton: {
        width:Dimensions.get('window').width * 0.80,
        height: Dimensions.get('window').height * 0.15,
        marginTop: "60%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#816A55",
      },
    BigButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    },

    image: {
        flex: 1,
    },
});
