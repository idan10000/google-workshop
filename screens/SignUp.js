import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {signUpStyles} from "../styles/signUpStyles";
import {Nofar_styles} from "./utils/Nofar_style";
import {fireAuth, fireStoreDB} from "../shared_components/firebase";
import {createUserWithEmailAndPassword, getAuth,} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";


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

export default function SignUp({navigation}) {

    const reviewSchema = yup.object({
        Name: yup.string()
            .required('שם הוא שדה חובה'),
        Email: yup.string().email('זו לא כתובת אימייל חוקית').required('אימייל הוא שדה חובה'),
        Password: yup.string().min(6, 'סיסמה חייבת להיות לפחות 6 תווים').required('סיסמה היא שדה חובה'),

        PhoneNumber: yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין')

    });


    const {passwordVisibility, rightIcon, handlePasswordVisibility} =
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
        if (det == "password") {
            return touched && val.length < 6
        }
    }


    const [name, setName] = React.useState( '')
    const onChangeName = name => setName(name);

    const [email, setEmail] = React.useState('')
    const onChangeEmail = email => setEmail(email);

    const [password, setPassword] = React.useState('')
    const onChangePassword = password => setPassword(password);

    const [phone, setPhone] = React.useState('')
    const onChangePhone = phone => setPhone(phone);


    // const [state, setState] = useState({
    //     name: "",
    //     phone: "",
    //     email: "",
    //     city: "",
    //     country: "",
    // });

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);


    // Handle user state changes
    async function onAuthStateChanged(newUser) {
        console.log("on auth changed")
        if (initializing) setInitializing(false);
        // const db = getFirestore();
        console.log(formRef)
        // const database = getDatabase();
        // await set(ref(database, 'users/' + newUser.uid), {
        //     username: "test",
        // });
        await setDoc(doc(fireStoreDB,"Users",newUser.uid), {
            // name: formRef.current.values.Name,
            // email: formRef.current.values.Email,
            // phone: formRef.current.values.PhoneNumber,
            reports: [],
            posters: []
        }).then(() => {
        }).catch(error => {
            console.log(error)
        })
        // newUser.sendEmailVerification()

    }

    useEffect(() => {
        return fireAuth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    function handleSubmitPress (props)  {
        console.log("handle submit press")
        console.log("formref")
        console.log(formRef)
        console.log(props)
        console.log(props.Email)
        console.log(props.Password)
        createUserWithEmailAndPassword(fireAuth, props.Email, props.Password)
            .then(() => {
                // getAuth().currentUser.sendEmailVerification()
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

    const formRef = useRef();

    console.log(formRef)
    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
        <View style={Nofar_styles.container}>
            <View style={signUpStyles.logoHeaderContainer}>

                <TouchableOpacity><Image source={require('../assets/Find_my_dog_logo.png')}
                                         style={signUpStyles.appLogo}/></TouchableOpacity>
                <View style={Nofar_styles.BigTitle}>
                    <Text style={Nofar_styles.BigTitle}>Welcome{'\n'}To FinDog</Text>
                </View>
            </View>

            <View style={signUpStyles.welcomeText}>
                <Text style={signUpStyles.welcomeText}>קודם כל... בוא נכיר אותך...</Text>
            </View>


            <Formik
                initialValues={{ Name: '', Email: '',Password:'', PhoneNumber: '' }}
                innerRef={formRef}
                validationSchema={reviewSchema}
                onSubmit={values =>
                handleSubmitPress(values)}>
                {/*// onSubmit={(values) => {*/}
                {/*//         console.log(values);*/}
                {/*//     }}*/}
                {/*//     >*/}

                {props => (

                    <View >
                        <View style={Nofar_styles.actionInput}>
                            <TextInput
                                placeholder="שם"
                                // error={hasErrors('name', props.values.Name,props.touched.Name)}
                                // value={state.fname}
                                // onChangeText={onChangeName}
                                onChangeText={(text) => {props.handleChange('Name')(text)
                                    console.log(formRef)}}
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
                            <TouchableOpacity style={Nofar_styles.SmallButton}
                                 onPress={props.handleSubmit}>
                                <Text style={Nofar_styles.SmallButtonTitle}>תרשמו אותי!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
            </ImageBackground>
    );
}
