import React, { useState } from 'react';
import { StyleSheet, Button, View, Text,TouchableOpacity,Image , Pressable} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import {signUpStyles} from "../styles/signUpStyles";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

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
export default function SecondSignIn() {

    const reviewSchema = yup.object({
        FirstName: yup.string()
            .required('First Name is required'),
        LastName: yup.string()
            .required('Last Name is required'),
        Email: yup.string().email().required('Email is required'),
        Password: yup.string().min(6).required('Password is required'),

        PhoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')

    });


    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const [password, setPassword] = useState('');

    return (
        <View style={signUpStyles.totalWrapper}>
            <View style={signUpStyles.logoHeaderContainer}>
                <View style={signUpStyles.header}>
                    <Text style={signUpStyles.header}>Welcome To FinDog</Text>
                </View>
                <TouchableOpacity ><Image source={require('../assets/findog.png')} style={signUpStyles.appLogo}/></TouchableOpacity>
            </View>
            <View style={signUpStyles.welcomeText}>
                <Text style={signUpStyles.welcomeText}>First of all...{'\n'}Let's get to know you...</Text>
            </View>

            <Formik
                initialValues={{ FirstName: '', LastName: '', Email: '',Password:'', PhoneNumber: '' }}
                validationSchema={reviewSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Button color='maroon' title="Submit" onPress={props.handleSubmit} style={signUpStyles.submitButton} />


)}
    </Formik>
        </View>
    );
}
