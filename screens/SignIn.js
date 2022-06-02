import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {signUpStyle} from "../styles/SignUpStyle";
import {Nofar_styles} from "../styles/NofarStyle";
import {fireAuth, fireStoreDB} from "../shared_components/Firebase";
import {createUserWithEmailAndPassword, getAuth, updatePhoneNumber, updateProfile} from 'firebase/auth';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {getDatabase, ref, set} from "firebase/database";


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

        Email: yup.string().email('זו לא כתובת אימייל חוקית').required('אימייל הוא שדה חובה'),
        Password: yup.string().min(6, 'סיסמה חייבת להיות לפחות 6 תווים').required('סיסמה היא שדה חובה'),

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


    const [name, setName] = React.useState('')
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
        await setDoc(doc(fireStoreDB, "Users", newUser.uid), {
            email: email,
            reports: [],
            posters: []
        }).then(() => {
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        return fireAuth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, [name, phone, email]);

    async function handleSubmitPress(props) {
        console.log("handle submit press")
        await createUserWithEmailAndPassword(fireAuth, props.Email, props.Password)
            .then((result) => {

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

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../assets/new_background.png')}>
            <View style={Nofar_styles.container}>
                <View style={{...signUpStyle.logoHeaderContainer, marginTop: "20%"} }>

                    <TouchableOpacity><Image source={require('../assets/Find_my_dog_logo.png')}
                                             style={signUpStyle.appLogo}/></TouchableOpacity>

                </View>

                <View style={signUpStyle.welcomeText}>
                    <Text style={signUpStyle.welcomeText}>כיף לראות אותך שוב!</Text>
                </View>


                <Formik
                    initialValues={{ Email: '', Password: ''}}
                    innerRef={formRef}
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
                                        onChangeEmail(email)
                                    }
                                    }
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
                                    onChangeText={props.handleChange('Password')}
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




                            <View style={signUpStyle.submitButton}>
                                {/*<TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>*/}
                                {/*    <Text style={Nofar_styles.BigButtonText}>עדכן פרטים</Text>*/}
                                {/*</TouchableOpacity>*/}
                                <TouchableOpacity style={Nofar_styles.SmallButton}
                                                  onPress={props.handleSubmit}>
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
