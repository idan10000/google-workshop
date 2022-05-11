import {ImageBackground, Text, View, Image, TouchableOpacity} from 'react-native';
import {landingPageStyle} from '../styles/LandingPageStyle';

import {Avatar, Button} from 'react-native-paper';
import {Nofar_styles} from "../styles/NofarStyle";
import React from "react";
import {fireAuth} from "../shared_components/Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";


export default function PageLaunch({navigation}) {

    const tempDebugLoginHandler = (email, password) => {
        console.log(email)
        console.log(password)
        signInWithEmailAndPassword(fireAuth,email,password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.popToTop();
                navigation.replace("App")
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>

            <View style={landingPageStyle.appNameHeader}>
                <Text style={landingPageStyle.appNameHeader}> FinDog</Text>
            </View>
            <  View style={landingPageStyle.slogenContainer}>

                <Image
                    style={landingPageStyle.appLogo}
                    source={require('../assets/Find_my_dog_logo.png')}
                />
            </View>


            <View style={landingPageStyle.bigTitle}>
                <Text style={landingPageStyle.bigTitle}>הכלב חסר? אל תדאגו!{'\n'}נעזור למצוא אותו מהר!</Text>
            </View>

            {/*<View style={landingPageStyle.howToSign}>*/}

            {/*    <Text style={Nofar_styles.text}> איך לחבר אותך?</Text>*/}
            {/*</View>*/}


            <View style={landingPageStyle.emailRegist}>

                <TouchableOpacity style={Nofar_styles.SmallButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={Nofar_styles.SmallButtonTitle}>הרשמה באמצעות מייל</Text>
                </TouchableOpacity>
                <Text style={landingPageStyle.text}> או באמצעות </Text>

            </View>
            <View style={landingPageStyle.AvatarContainer}>

                <TouchableOpacity><Avatar.Image size={55} source={require('../assets/facebook.png')}
                                                style={landingPageStyle.avatar}/></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log("google")
                }}><Avatar.Image size={55} source={require('../assets/google.png')}
                                 style={landingPageStyle.avatar}/></TouchableOpacity>
            </View>
            <View style={landingPageStyle.containerForRegisterClick}>
                <Text style={Nofar_styles.text}> כבר רשומים? </Text>
                <TouchableOpacity onPress={() => {tempDebugLoginHandler("idan.pinto3@gmail.com","123456")}}><Text style={landingPageStyle.clickHere}>לחצו כאן!</Text></TouchableOpacity>


            </View>
            <View style={landingPageStyle.sellingText}>

                <Text style={landingPageStyle.bottomText}>האפליקציה שלנו מספקת פתרון מהפכני{'\n'}שמציע לבעלי כלבים דרך
                    פשוטה ואפקטיבית{'\n'}למצוא את הכלב האהוב שלהם</Text>

            </View>
        </ImageBackground>
    );}
