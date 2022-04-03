import React, { useState } from 'react';
import { StyleSheet, View, Text,TouchableOpacity,Image , Pressable} from 'react-native';
import { HelperText, TextInput,Button } from 'react-native-paper';

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
        Name: yup.string()
             .required('שם הוא שדה חובה'),
        Email: yup.string().email('זו לא כתובת אימייל חוקית').required('אימייל הוא שדה חובה'),
        Password: yup.string().min(6,'סיסמה חייבת להיות לפחות 6 תווים').required('סיסמה היא שדה חובה'),

        PhoneNumber: yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין')

    });



    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const hasErrors = (det, val, touched) => {
        if (det == "email") {
            return touched && !val.includes("@");
        }
        if (det == "name") {
            return touched && val.localeCompare(" ")
        }
        if (det == "phone") {
            return touched && !val.match(phoneRegExp)
        }
        if(det =="password"){
            return touched && val.length <6
        }
    }


    // const [name, setName] = React.useState( "")
    // const onChangeName = name => setName(name);
    //
    // const [email, setEmail] = React.useState('')
    // const onChangeEmail = email => setEmail(email);
    //
    // const [password, setPassword] = React.useState('')
    // const onChangePassword = password => setPassword(password);
    //
    // const [phone, setPhone] = React.useState('')
    // const onChangePhone = phone => setName(phone);


    // const [state, setState] = useState({
    //     fname: "",
    //     phone: "",
    //     email: "",
    //     city: "",
    //     country: "",
    // });


    return (
        <View style={Nofar_styles.container}>
            <View style={signUpStyles.logoHeaderContainer}>

                <TouchableOpacity ><Image source={require('../assets/Find my dog_logo.png')} style={signUpStyles.appLogo}/></TouchableOpacity>
                <View style={Nofar_styles.BigTitle}>
                    <Text style={Nofar_styles.BigTitle}>Welcome{'\n'}To FinDog</Text>
                </View>
            </View>

            <View style={signUpStyles.welcomeText}>
                <Text style={signUpStyles.welcomeText}>קודם כל... בוא נכיר אותך...</Text>
            </View>


            <Formik
                initialValues={{ Name: '', Email: '',Password:'', PhoneNumber: '' }}
                validationSchema={reviewSchema}               onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {props => (

                    <View >
            <View style={Nofar_styles.actionInput}>
                <TextInput
                    placeholder="שם"
                    error={hasErrors('name', props.values.Name,props.touched.Name)}
                    // value={state.fname}
                    // onChangeText={onChangeName}
                    onChangeText={props.handleChange('Name')}
                    value={props.values.Name}
                    onBlur={props.handleBlur('Name')}

                    activeUnderlineColor="#000000"
                    activeOutlineColor="#000000"
                    left={<TextInput.Icon name="face" />}
                />
                <Text style={signUpStyles.errorText}>{props.touched.Name && props.errors.Name}</Text>
            </View>


                        <View style={Nofar_styles.actionInput}>
                <TextInput
                    placeholder="אימייל"
                    // value={state.email}
                    //
                    // onChangeText={onChangeEmail}
                    onChangeText={props.handleChange('Email')}
                    value={props.values.Email}
                    onBlur={props.handleBlur('Email')}
                    error={hasErrors('email', props.values.Email,props.touched.Email)}

                    activeUnderlineColor="#000000"
                    activeOutlineColor="#000000"
                    left={<TextInput.Icon name="email" />}
                />
                            <Text style={signUpStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>
            </View>




                <View style={Nofar_styles.actionInput}>
                    <TextInput
                        placeholder="סיסמה"
                        // value={state.password}
                        // onChangeText={onChangePassword}
                        onChangeText={props.handleChange('Password')}
                        value={props.values.Password}
                        secureTextEntry={passwordVisibility}
                        error={hasErrors('password', props.values.Password,props.touched.Password)}
                        onBlur={props.handleBlur('Password')}

                        activeUnderlineColor="#000000"
                        activeOutlineColor="#000000"
                        right={<TextInput.Icon onPress={handlePasswordVisibility} name={rightIcon} />}
                        left ={<TextInput.Icon  name ="lock" />}

                    />
                    <Text style={signUpStyles.errorText}>{props.touched.Password && props.errors.Password}</Text>
            </View>



                        <View style={Nofar_styles.actionInput}>
                <TextInput
                    placeholder="טלפון (*רשות)"
                    // value={state.phone}
                    // onChangeText={onChangePhone}
                    onChangeText={props.handleChange('PhoneNumber')}
                    value={props.values.PhoneNumber}
                    onBlur={props.handleBlur('PhoneNumber')}
                    keyboardType='numeric'
                    activeUnderlineColor="#000000"
                    activeOutlineColor="#000000"
                    left={<TextInput.Icon name="phone" />}
                />
                            <Text style={signUpStyles.errorText}>{props.touched.PhoneNumber && props.errors.PhoneNumber}</Text>
            </View>

                        <View style={signUpStyles.submitButton}>
                            {/*<TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>*/}
                            {/*    <Text style={Nofar_styles.BigButtonText}>עדכן פרטים</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity style={Nofar_styles.SmallButton} onPress={props.handleSubmit}>
                                <Text style={Nofar_styles.SmallButtonTitle}>עדכן פרטים</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>





        </View>
    );
}
