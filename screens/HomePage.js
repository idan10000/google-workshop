import {StyleSheet, View, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {getAuth, signOut} from "firebase/auth";
import {Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomePage({navigation}) {

//     const filename = "C:\\Users\\idanp\\OneDrive\\Documents\\University\\google\\workshop-app\\screens\\Map\\dog1.png";
//     const endpointId = "4709947173578473472";
//     const project = "findog-a0110";
//     const location = "us-central1";
//     const aiplatform = require('@google-cloud/aiplatform');
//     const {instance, params, prediction} =
//         aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;
//
// // Imports the Google Cloud Prediction Service Client library
//     const {PredictionServiceClient} = aiplatform.v1;
//
// // Specifies the location of the api endpoint
//     const clientOptions = {
//         apiEndpoint: 'us-central1-aiplatform.googleapis.com',
//     };
//
// // Instantiates a client
//     const predictionServiceClient = new PredictionServiceClient(clientOptions);

    async function predictImageClassification() {
        // Configure the endpoint resource
        // const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;
        //
        // const parametersObj = new params.ImageClassificationPredictionParams({
        //     confidenceThreshold: 0.5,
        //     maxPredictions: 5,
        // });
        // const parameters = parametersObj.toValue();
        //
        // const fs = require('fs');
        // const image = fs.readFileSync(filename, 'base64');
        // const instanceObj = new instance.ImageClassificationPredictionInstance({
        //     content: image,
        // });
        // const instanceValue = instanceObj.toValue();
        //
        // const instances = [instanceValue];
        // const request = {
        //     endpoint,
        //     instances,
        //     parameters,
        // };
        //
        // // Predict request
        // const [response] = await predictionServiceClient.predict(request);
        //
        // console.log('Predict image classification response');
        // console.log(`\tDeployed model id : ${response.deployedModelId}`);
        // const predictions = response.predictions;
        // console.log('\tPredictions :');
        // for (const predictionValue of predictions) {
        //     const predictionResultObj =
        //         prediction.ClassificationPredictionResult.fromValue(predictionValue);
        //     for (const [i, label] of predictionResultObj.displayNames.entries()) {
        //         console.log(`\tDisplay name: ${label}`);
        //         console.log(`\tConfidences: ${predictionResultObj.confidences[i]}`);
        //         console.log(`\tIDs: ${predictionResultObj.ids[i]}\n\n`);
        //     }
        // }
    }



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
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
            <View style={styles.BigButtonView}>
                <Text style = {styles.foundDog}>מצאתי כלב!</Text>
                <TouchableOpacity
                    // mode='contained'
                    // icon='camera'
                    style={styles.BigButton}
                    onPress={openCamera}>
                    {/*labelStyle={styles.BigButtonText}>*/}
                    <View         justifyContent= "center" alignItems= "center"  marginRight="8%">
                    <Icon name="camera" size={24} color ="#FFFFFF"  /></View>
                    <Text style={styles.BigButtonText}>פתח מצלמה</Text>
                </TouchableOpacity>
            </View>
                <View style={styles.SmallButtonView}>
                    <TouchableOpacity
                        style={styles.SmallButton}
                        onPress={predictImageClassification}>
                        <View  justifyContent= "center" alignItems= "center" flexDirection = "row" marginRight="4%">
                        <Icon name="image" size={24} color ="#DCA277"  /></View>
                        <Text style={styles.SmallButtonTitle}>העלאת תמונה מגלריה</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.SmallButtonView}>
                    <Text style={styles.lostDog}>איבדתי כלב!</Text>

                    <TouchableOpacity
                        style={styles.MidButton}
                        onPress={createPosterPressHandler}>
                        <View  justifyContent= "center" alignItems= "center" flexDirection = "row" marginRight="4%">
                            <Icon name="pencil" size={24} color ="#FFFFFF"  /></View>
                        <Text style={styles.MidButtonTitle}>יצירת מודעה על כלב שאבד</Text>

                    </TouchableOpacity>
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

    SmallButtonView: {
        alignSelf:"center",
        marginTop:"5%"


    },
    SmallButtonTitle: {
        lineHeight:23,
        color: "#DCA277",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
    },
    SmallButton: {
        flexDirection : "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 6,
        justifyContent: "center",
        alignItems: "center",
        width:Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.07,
        backgroundColor: "#FFFFFF",
        borderColor: "#DCA277",
        borderStyle: "solid",
        borderRadius: 11,
        borderWidth:2

    },
    BigButtonView: {
        alignSelf:"center",


    },
    BigButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 6,
        width:Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11.111,
        backgroundColor: "#DCA277",
    },
    BigButtonText: {
        lineHeight:32,
        color: "#FFFFFF",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "700",
    },

    image: {
        flex: 1,
    },
    foundDog:{
        marginTop: "14%",
        marginBottom:"3%",
        lineHeight:35,
        color: "#9E6C6C",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "700",
    },
    lostDog:{
        marginTop: "25%",
        marginBottom:"3%",
        lineHeight:35,
        color: "#9E6C6C",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "700",


    },
    MidButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 6,
        width:Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.08,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11.111,
        backgroundColor: "#DCA277",
    },
    MidButtonTitle:{
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
    },
    smallIconContainer: {
        backgroundColor: "#DCA277",
        width:100,
    }
});
