import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { pageLaunchStyle } from '../styles/pageLaunchStyle';
import { Avatar, Button } from 'react-native-paper';
export default function PageLaunch() {
    return (
        <View style ={pageLaunchStyle.totalWrapper}>
            <View style={pageLaunchStyle.appNameHeader}>
                <Text style={pageLaunchStyle.appNameHeader}> FinDog</Text>
            </View>
            <  View style={pageLaunchStyle.slogenContainer}>

                <View>
                    <Text >איבדתם את הכלב?{'\n'}אל תדאגו!{'\n'} אנחנו פה לעזור לכם למצוא אותם! </Text>
                </View>
                <Image
                    style={pageLaunchStyle.appLogo}
                    source={require('../assets/findog.png')}
                />
            </View>
            <View style={pageLaunchStyle.sellingText}>

                <Text >האפליקציה שלנו מספקת פתרון מהפכני{'\n'} שמציע לבעלי כלבים דרך פשוטה ואפקטיבית {'\n'}למצוא את הכלב האהוב שלהם  </Text>

            </View>



            <View style={pageLaunchStyle.AvatarContainer}>
                <TouchableOpacity ><Avatar.Image size={50} source={require('../assets/facebook.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
                <TouchableOpacity ><Avatar.Image size={50} source={require('../assets/google.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
            </View>
            <View style={pageLaunchStyle.containerForMiddleLines}>
                <Text style={pageLaunchStyle.text}>או</Text>
            </View>

            <View style={pageLaunchStyle.signupButton}>
                <Button mode='contained'  > הירשמו באמצעות Email</Button>
            </View>

            <View style={pageLaunchStyle.containerForRegisterClick} >
                <Text> כבר נרשמתם?</Text>
                <TouchableOpacity ><Text> תלחצו כאן!</Text></TouchableOpacity>


            </View>
        </View>

    );
}


