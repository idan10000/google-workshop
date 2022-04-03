import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { pageLaunchStyle } from '../styles/pageLaunchStyle';

import { Avatar, Button } from 'react-native-paper';
import {Nofar_styles} from "./utils/Nofar_style";
export default function PageLaunch() {
    return (
        <View style ={Nofar_styles.container}>
            <View style={Nofar_styles.BigTitle}>
                <Text style={Nofar_styles.BigTitle}> FinDog</Text>
            </View>
            <  View style={pageLaunchStyle.slogenContainer}>

                <View>
                    <Text >איבדתם את הכלב?{'\n'}אל תדאגו! אנחנו פה {'\n'}לעזור לכם למצוא אותו! </Text>
                </View>
                <Image
                    style={pageLaunchStyle.appLogo}
                    source={require('../assets/logo design.png')}
                />
            </View>
            <View style={pageLaunchStyle.sellingText}>

                <Text> איך לחבר אותך?</Text>
            </View>



            <View style={pageLaunchStyle.AvatarContainer}>

                <TouchableOpacity ><Avatar.Image size={45} source={require('../assets/facebook.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
                <Text style={pageLaunchStyle.text}>או</Text>

                <TouchableOpacity ><Avatar.Image size={45} source={require('../assets/google.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
            </View>


            <View style={pageLaunchStyle.signupButton}>
                <Button   > הירשמו באמצעות Email</Button>
            </View>

            <View style={pageLaunchStyle.containerForRegisterClick} >
                <Text> כבר נרשמתם?</Text>
                <TouchableOpacity ><Text> תלחצו כאן!</Text></TouchableOpacity>


            </View>
            <View style={pageLaunchStyle.sellingText}>

                <Text >האפליקציה שלנו מספקת פתרון מהפכני{'\n'} שמציע לבעלי כלבים דרך פשוטה ואפקטיבית {'\n'}למצוא את הכלב האהוב שלהם  </Text>

            </View>
        </View>

    );
}


