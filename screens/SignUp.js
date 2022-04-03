import React, { useState } from 'react';
import { StyleSheet, Button, View, Text,TouchableOpacity,Image , Pressable} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import {signUpStyles} from "../styles/signUpStyles";
import {Nofar_styles} from "./utils/Nofar_style";


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
export default function SignUp() {

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
        <View style={Nofar_styles.container}>
            <View style={signUpStyles.logoHeaderContainer}>
                <View style={Nofar_styles.BigTitle}>
                    <Text style={Nofar_styles.BigTitle}>Welcome To FinDog</Text>
                </View>
                <TouchableOpacity ><Image source={require('../assets/Find my dog_logo.png')} style={signUpStyles.appLogo}/></TouchableOpacity>
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
                {props => (

                    <View >
                        <TextInput
                            style={Nofar_styles.actionInput}
                            placeholder='First Name'
                            onChangeText={props.handleChange('FirstName')}
                            onBlur={props.handleBlur('FirstName')}

                            value={props.values.FirstName}
                        />
                        <Text style={signUpStyles.errorText}>{props.touched.FirstName && props.errors.FirstName}</Text>

                        <TextInput
                            style={Nofar_styles.actionInput}
                            multiline
                            placeholder='Last Name'
                            onBlur={props.handleBlur('LastName')}

                            onChangeText={props.handleChange('LastName')}
                            value={props.values.LastName}
                        />
                        <Text style={signUpStyles.errorText}>{props.touched.LastName && props.errors.LastName}</Text>

                        <TextInput
                            style={Nofar_styles.actionInput}
                            placeholder='Email'
                            onBlur={props.handleBlur('Email')}

                            onChangeText={props.handleChange('Email')}
                            value={props.values.Email}
                            keyboardType='numeric'
                        />
                        <Text style={signUpStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>
                        <View style={signUpStyles.inputContainer}>
                            <Pressable style = {signUpStyles.eyeIcon} onPress={handlePasswordVisibility}>
                                <MaterialCommunityIcons name={rightIcon} size={24} color="#232323" />
                            </Pressable>
                            <TextInput
                                placeholder='Password'
                                onBlur={props.handleBlur('Password')}

                                onChangeText={props.handleChange('Password')}
                                value={props.values.Password}
                                keyboardType='numeric'

                                style={Nofar_styles.actionInput}
                                name="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                secureTextEntry={passwordVisibility}
                                enablesReturnKeyAutomatically
                            />

                        </View>

                        <Text style={signUpStyles.errorText}>{props.touched.Password && props.errors.Password}</Text>
                        <TextInput
                            style={Nofar_styles.actionInput}
                            placeholder='** Phone Number'
                            onBlur={props.handleBlur('PhoneNumber')}

                            onChangeText={props.handleChange('PhoneNumber')}
                            value={props.values.PhoneNumber}
                            keyboardType='numeric'
                        />
                        <Text style={signUpStyles.errorText}>{props.touched.PhoneNumber && props.errors.PhoneNumber}</Text>
                        <View style={signUpStyles.inform}>
                            <Text> ** is optional</Text>
                        </View>

                        <Button color='maroon' title="Submit" onPress={props.handleSubmit} style={Nofar_styles.BigButton} />

                    </View>
                )}
            </Formik>


        </View>
    );
}
