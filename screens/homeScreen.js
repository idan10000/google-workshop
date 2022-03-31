import {StyleSheet, View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {useState} from "react";


export default function HomeScreen() {

    const [pickedImagePath, setPickedImagePath] = useState('');

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    return (
        <View style={styles.container}>
            <Button
                mode='contained'
                icon='camera'
                color='blue'
                style={styles.button}
                onPress={openCamera}>
                מצאתי כלב!
            </Button>

            <Button
                mode='outlined'
                icon='image'
                color='blue'
                style={styles.smallButton}
                onPress={() => console.log('upload from gallery')}>
                העלאה מגלריה
            </Button>

            <Button
                mode='outlined'
                color='blue'
                style={styles.smallButton}
                onPress={() => console.log('upload missing ad')}>
                יצירת מודעה
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    smallButton: {
        margin: 20,
        bottom: 60
    },
    button: {
        padding: 50,
        bottom: 150,
        borderRadius: 50
    }
});
