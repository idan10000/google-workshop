import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

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

    return (
        <View style={styles.container}>
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
                        onPress={() => console.log('upload from gallery')}
                        labelStyle={styles.SmallButtonTitle}>
                        העלאה מגלריה
                    </Button>
                </View>
                
                <View style={styles.SmallButtonView}>
                    <Button
                        mode='outlined'
                        style={styles.SmallButton}
                        onPress={() => console.log('upload missing ad')}
                        labelStyle={styles.SmallButtonTitle}>
                        יצירת מודעה
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#BBB988",
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
});
