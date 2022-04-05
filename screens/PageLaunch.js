import { ImageBackground, Text, View, Image,TouchableOpacity } from 'react-native';
import { pageLaunchStyle } from '../styles/pageLaunchStyle';

import { Avatar, Button } from 'react-native-paper';
import {Nofar_styles} from "./utils/Nofar_style";
import React from "react";
export default function PageLaunch({navigation}) {
    return (
        <ImageBackground
            style={{flex:1}}
            source={require('../assets/background_design.png')}>

            <View style={pageLaunchStyle.appNameHeader}>
                <Text style={pageLaunchStyle.appNameHeader}> FinDog</Text>
            </View>
            <  View style={pageLaunchStyle.slogenContainer}>

            <Image
                style={pageLaunchStyle.appLogo}
                source={require('../assets/Find_my_dog_logo.png')}
            />
            </View>


                <View style = {pageLaunchStyle.bigTitle}>
                    <Text style = {pageLaunchStyle.bigTitle}>הכלב חסר? אל תדאגו!{'\n'}נעזור למצוא אותו מהר!</Text>
                </View>

            {/*<View style={pageLaunchStyle.howToSign}>*/}

            {/*    <Text style={Nofar_styles.text}> איך לחבר אותך?</Text>*/}
            {/*</View>*/}





            <View style={pageLaunchStyle.emailRegist}>

            <TouchableOpacity style={Nofar_styles.SmallButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={Nofar_styles.SmallButtonTitle}>הרשמה באמצעות מייל</Text>
            </TouchableOpacity>
                <Text style = {pageLaunchStyle.text}> או באמצעות </Text>

            </View>
            <View style={pageLaunchStyle.AvatarContainer}>

                <TouchableOpacity ><Avatar.Image size={55} source={require('../assets/facebook.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >

                <TouchableOpacity ><Avatar.Image size={55} source={require('../assets/google.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
            </View>
            <View style={pageLaunchStyle.containerForRegisterClick} >
                <Text style = {Nofar_styles.text}> כבר רשומים?  </Text>
                <TouchableOpacity ><Text style = {pageLaunchStyle.clickHere}>לחצו כאן!</Text></TouchableOpacity>


            </View>
            <View style={pageLaunchStyle.sellingText}>

                <Text style = {pageLaunchStyle.bottomText}>האפליקציה שלנו מספקת פתרון מהפכני{'\n'}שמציע לבעלי כלבים דרך פשוטה ואפקטיבית{'\n'}למצוא את הכלב האהוב שלהם</Text>

            </View>
        </ImageBackground>


    );
}


