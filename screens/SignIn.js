import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Button,
    View,
    Text,
    TouchableOpacity,
    Image,
    Pressable,
    ImageBackground,
    ImageBackgroundComponent
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TextInput} from 'react-native-paper';

import {Formik} from 'formik';
import {AfterSignedStyle} from '../styles/AfterSignedStyle';
import * as yup from 'yup';
import {fireAuth} from "../shared_components/Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Nofar_styles} from "../styles/NofarStyle";
import {signUpStyle} from "../styles/SignUpStyle";

import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {getDatabase, ref, set} from "firebase/database";

// this is the page e you wee when you sign in to your user


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');


    // changes the visibility of the password
    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    };
};


export default function SignIn({navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [loggedUser, setLoggedUser] = useState();
    // Handle user state changes
    function onAuthStateChanged(newUser) {
        setLoggedUser(newUser);
        console.log(newUser)
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return fireAuth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    async function handleSubmitPress(email, password){
        console.log(email)
        console.log(password)
        await signInWithEmailAndPassword(fireAuth, email, password)
            .then(() => {
                // navigation.popToTop();

                // navigation.navigate("App")
            })
            // .then((result) => {
            //
            // })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    console.log('That email address is already in use!');
                    setValidPassword(false)
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setValidEmail(false)
                }
                if (error.code === 'auth/user-not-found') {
                    console.log('That email address is invalid!');
                    setValidEmail(false)
                    setValidPassword(false)
                }

            });
    }

    // simple check of errors in given data
    const hasErrors = (det, val, touched) => {
        if (det === "email") {
            return touched && !val.includes("@");
        }
        if (det === "name") {
            return touched && val.localeCompare(" ")
        }
        if (det === "phone") {
            return touched && !val.match(phoneRegExp)
        }
        if (det === "password") {
            return touched && val.length < 6
        }
    }
    const reviewSchema = yup.object({
        Email: yup.string().email('זו לא כתובת אימייל חוקית').required('אימייל הוא שדה חובה'),
        Password: yup.string().min(6, 'סיסמה חייבת להיות לפחות 6 תווים').required('סיסמה היא שדה חובה'),


    });


    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        useTogglePasswordVisibility();
    const [password, setPassword] = useState('');


    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);


    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
            <View style={Nofar_styles.container}>
                <View style={signUpStyle.logoHeaderContainer}>

                    <TouchableOpacity>
                        <Image source={require('../assets/Find_my_dog_logo.png')}
                                             style={signUpStyle.appLogo}/>
                    </TouchableOpacity>

                </View>

                {/*<View style={signUpStyle.welcomeText}>*/}
                {/*    <Text style={signUpStyle.welcomeText}>ברוכים השבים</Text>*/}
                {/*</View>*/}


                <Formik
                    initialValues={{ Email: '', Password: ''}}
                    validationSchema={reviewSchema}
                    onSubmit={values =>
                        handleSubmitPress(values)}>
                    {/*// onSubmit={(values) => {*/}
                    {/*//         console.log(values);*/}
                    {/*//     }}*/}
                    {/*//     >*/}

                    {props => (

                        <View>



                            <View style={Nofar_styles.actionInput}>
                                <TextInput
                                    placeholder="אימייל"
                                    // value={state.email}
                                    //
                                    // onChangeText={onChangeEmail}
                                    onChangeText={(email) => {
                                        props.handleChange('Email')(email)
                                        setValidEmail(true)
                                        setValidPassword(true)

                                    }                 }
                                    value={props.values.Email}
                                    onBlur={props.handleBlur('Email')}
                                    error={hasErrors('email', props.values.Email, props.touched.Email)}

                                    activeUnderlineColor="#000000"
                                    activeOutlineColor="#000000"
                                    left={<TextInput.Icon name="email"/>}
                                />

                                <Text style={signUpStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>
                            </View>


                            <View style={Nofar_styles.actionInput}>
                                <TextInput
                                    placeholder="סיסמה"
                                    // value={state.password}
                                    // onChangeText={onChangePassword}
                                    onChangeText={(email) => {
                                        props.handleChange('Password')(email)
                                        setValidEmail(true)
                                        setValidPassword(true)

                                    }      }
                                    value={props.values.Password}
                                    secureTextEntry={passwordVisibility}
                                    error={hasErrors('password', props.values.Password, props.touched.Password)}
                                    onBlur={props.handleBlur('Password')}

                                    activeUnderlineColor="#000000"
                                    activeOutlineColor="#000000"
                                    right={<TextInput.Icon onPress={handlePasswordVisibility} name={rightIcon}/>}
                                    left={<TextInput.Icon name="lock"/>}
                                />
                                <Text
                                    style={signUpStyle.errorText}>{props.touched.Password && props.errors.Password}</Text>
                            </View>



                            {(!validEmail || !validPassword) &&
                                !hasErrors('email', props.values.Email, props.touched.Email) &&
                                !hasErrors('password', props.values.Password, props.touched.Password) &&
                                <View style={Nofar_styles.actionInput}>
                                    <Text style={signUpStyle.errorText2}>האימייל או הסיסמה אינם נכונים</Text></View>


                            }
                            <View style={signUpStyle.submitButton}>

                                <TouchableOpacity style={Nofar_styles.SmallButton}
                                                  onPress={() => handleSubmitPress(props.values.Email, props.values.Password)}>
                                    <Text style={Nofar_styles.SmallButtonTitle}>תכניסו אותי!</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </Formik>
            </View>
        </ImageBackground>
    );
}
