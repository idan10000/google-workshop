import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { pageLaunchStyle } from '../styles/pageLaunchStyle';
import { Avatar, Button } from 'react-native-paper';
export default function pageLaunch() {
    return (
        <View style ={pageLaunchStyle.totalWrapper}>
            <View style={pageLaunchStyle.appNameHeader}>
                <Text style={pageLaunchStyle.appNameHeader}> FinDog</Text>
            </View>
            <  View style={pageLaunchStyle.slogenContainer}>

                <View>
                    <Text >Lost your dog?{'\n'}Don't worry!{'\n'}We'll help U find it </Text>
                </View>
                <Image
                    style={pageLaunchStyle.appLogo}
                    source={require('../assets/findog.png')}
                />
            </View>
            <View style={pageLaunchStyle.sellingText}>

                <Text >Our app provides a revolutionary platform{'\n'}which offers dog-owners a new simple, effective way
                    to find their precious dogs </Text>

            </View>



            <View style={pageLaunchStyle.AvatarContainer}>
                <TouchableOpacity ><Avatar.Image size={50} source={require('../assets/facebook.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
                <TouchableOpacity ><Avatar.Image size={50} source={require('../assets/google.png')} style={pageLaunchStyle.avatar}/></TouchableOpacity >
            </View>
            <View style={pageLaunchStyle.containerForMiddleLines}>
                <Text style={pageLaunchStyle.text}>OR</Text>
            </View>

            <View style={pageLaunchStyle.signupButton}>
                <Button mode='contained'  > Sign up Via Email </Button>
            </View>

            <View style={pageLaunchStyle.containerForRegisterClick} >
                <TouchableOpacity ><Text> click HERE</Text></TouchableOpacity>
                <Text> Already registered?</Text>

            </View>
        </View>

    );
}


