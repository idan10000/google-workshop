import React, { useEffect, useRef, useState } from "react";

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button, TextInput, Modal, Portal } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { signUpStyle } from "../styles/SignUpStyle";
import { Nofar_styles } from "../styles/NofarStyle";
import { fireAuth, fireStoreDB } from "../shared_components/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { getApp } from "firebase/app";
import { Touchable } from "react-native-web";
import { stylesPoster } from "./CreatePoster/CreatePosterStyle";
import Icon from "react-native-vector-icons/AntDesign";

// this page is used when a new user wants to join the app via email

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export default function SignUp({ navigation }) {
  const reviewSchema = yup.object({
    Name: yup.string().required("שם הוא שדה חובה"),
    Email: yup
      .string()
      .email("זו לא כתובת אימייל חוקית")
      .required("אימייל הוא שדה חובה"),
    Password: yup
      .string()
      .min(6, "סיסמה חייבת להיות לפחות 6 תווים")
      .required("סיסמה היא שדה חובה"),

    PhoneNumber: yup.string().matches(phoneRegExp, "מספר טלפון לא תקין"),
  });

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const hasErrors = (det, val, touched) => {
    if (det == "email") {
      return touched && !val.includes("@");
    }
    if (det == "name") {
      return touched && val.localeCompare(" ");
    }
    if (det == "phone") {
      return touched && !val.match(phoneRegExp);
    }
    if (det == "password") {
      return touched && val.length < 6;
    }
  };

  const [name, setName] = React.useState("");
  const onChangeName = (name) => setName(name);

  const [email, setEmail] = React.useState("");
  const onChangeEmail = (email) => setEmail(email);

  const [password, setPassword] = React.useState("");
  const onChangePassword = (password) => setPassword(password);

  const [phone, setPhone] = React.useState("");
  const onChangePhone = (phone) => setPhone(phone);

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
    console.log("on auth changed");
    console.log(newUser);
    await setDoc(doc(fireStoreDB, "Users", newUser.uid), {
      name: name,
      email: email,
      phone: phone,
      reports: [],
      posters: [],
    }).catch((error) => {
      console.log("we are here");

      console.log(error);
    });
    await updateProfile(newUser, { displayName: name });
  }

  useEffect(() => {
    return fireAuth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  async function handleSubmitPress(props) {
    console.log("handle submit press");
    await createUserWithEmailAndPassword(fireAuth, props.Email, props.Password)
      .then((result) => {})
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          setValidEmail(false);
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        // console.error(error);
      });
  }

  const formRef = useRef();
  const [validEmail, setValidEmail] = useState(true);

  // ------------------------------------------ reCaptcha ------------------------------------------
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const app = getApp();
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  const modalConfirmPressHandler = () => {
    console.log("modal confirm");
  };
  const [visibleVerification, setVisibleVerification] = React.useState(false);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/new_background.png")}
    >
      <View style={Nofar_styles.container}>
        <View style={signUpStyle.logoHeaderContainer}>
          <TouchableOpacity>
            <Image
              source={require("../assets/findog_logo_1024_cropped.png")}
              style={signUpStyle.appLogo}
            />
          </TouchableOpacity>
          <View style={Nofar_styles.BigTitle}>
            <Text style={Nofar_styles.BigTitle}>
              ברוכים הבאים{"\n"}אל Findog
            </Text>
          </View>
        </View>

        {/*<View style={signUpStyle.welcomeText}>*/}
        {/*    <Text style={signUpStyle.welcomeText}>קודם כל... בוא נכיר אותך...</Text>*/}
        {/*</View>*/}

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          // attemptInvisibleVerification
        />
        <View style={Nofar_styles.actionInput}>
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            אנא הכניסו מספר טלפון
          </Text>
        </View>
        <View style={Nofar_styles.actionInput}>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="0545556566"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            activeUnderlineColor="#000000"
            activeOutlineColor="#000000"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </View>
        <View style={styles.bottomView}>
          <View style={{ marginRight: "1.5%", paddingTop: "1.5%" }}>
            <Icon name="infocirlceo" size={18} color="#000" />
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>
              אם מספר הטלפון שלכם אינו ישראלי אנא כתבו אותו בצורה מלאה עם
              הקידומת
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              const phoneProvider = new PhoneAuthProvider(getAuth());
              if (!(phoneNumber[0] === "+")) {
                setPhoneNumber("+972" + phoneNumber);
              }
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "קוד אימות נשלח למספר הטלפון שהזנת",
              });
              setVisibleVerification(true);
            } catch (err) {
              showMessage({ text: `מספר טלפון לא חוקי`, color: "red" });
            }
          }}
        >
          <View
            style={{
              backgroundColor: "#DCA277",
              width: Dimensions.get("window").width * 0.6,
              height: Dimensions.get("window").height * 0.055,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginTop: "5%",
            }}
          >
            <Text style={Nofar_styles.TinyButtonTitle}>שלח קוד אימות</Text>
          </View>
        </TouchableOpacity>

        <Portal>
          {/*Tags*/}
          <Modal
            visible={visibleVerification}
            onDismiss={modalConfirmPressHandler}
            contentContainerStyle={stylesPoster.modal}
          >
            <View style={Nofar_styles.actionInput}>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                הכנס קוד אימות
              </Text>
            </View>
            <View style={Nofar_styles.actionInput}>
              <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="הכניסו 6 ספרות"
                keyboardType="phone-pad"
                onChangeText={setVerificationCode}
                activeUnderlineColor="#000000"
                activeOutlineColor="#000000"
              />
            </View>
            {verificationId && (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    // const db = getFirestore();
                    // const phoneNumberRef = collection(db,"Users");
                    // console.log("\n\n\n\n\n\n")
                    //
                    // console.log("BI THERE")
                    //
                    // const q = query(phoneNumberRef, where("identifier", "==", phoneNumber));
                    // const querySnapshot = await getDocs(q);
                    // querySnapshot.forEach((doc) => {
                    //     // doc.data() is never undefined for query doc snapshots
                    //     console.log("\n\n\n\n\n\n")
                    //     console.log("1")
                    //
                    //     console.log("\n\n\n\n\n\n")
                    //
                    // });

                    const credential = PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                    const userCredential = await signInWithCredential(
                      getAuth(),
                      credential
                    );
                    console.log("USER CREDENTIAL:");
                    console.log(userCredential);
                    showMessage({ text: "Phone authentication successful 👍" });
                  } catch (err) {
                    showMessage({
                      text: `הקוד שהוכנס שגוי`,
                      color: "red",
                    });
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: "#DCA277",
                    width: Dimensions.get("window").width * 0.6,
                    height: Dimensions.get("window").height * 0.065,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    marginTop: "1%",
                    marginBottom: "5%",
                  }}
                >
                  <Text style={Nofar_styles.TinyButtonTitle}>
                    אשר קוד אימות
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {message ? (
              <TouchableOpacity
                style={[
                  { backgroundColor: 0xffffffee, justifyContent: "center" },
                ]}
                onPress={() => showMessage(undefined)}
              >
                <Text
                  style={{
                    color: message.color || "blue",
                    fontSize: 17,
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  {message.text}
                </Text>
              </TouchableOpacity>
            ) : undefined}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
          </Modal>
        </Portal>

        {/*<Formik*/}
        {/*    initialValues={{Name: '', Email: '', Password: '', PhoneNumber: ''}}*/}
        {/*    innerRef={formRef}*/}
        {/*    validationSchema={reviewSchema}*/}
        {/*    onSubmit={values =>*/}
        {/*        handleSubmitPress(values)}>*/}
        {/*// onSubmit={(values) => {*/}
        {/*//         console.log(values);*/}
        {/*//     }}*/}
        {/*//     >*/}

        {/*    {props => (*/}

        {/*        <View>*/}
        {/*            <View style={Nofar_styles.actionInput}>*/}
        {/*                <TextInput*/}
        {/*                    placeholder="שם"*/}
        {/*                    // error={hasErrors('name', props.values.Name,props.touched.Name)}*/}
        {/*                    // value={state.fname}*/}
        {/*                    // onChangeText={onChangeName}*/}
        {/*                    onChangeText={(text) => {*/}
        {/*                        console.log(text)*/}
        {/*                        props.handleChange('Name')(text)*/}
        {/*                        onChangeName(text)*/}

        {/*                    }}*/}
        {/*                    value={props.values.Name}*/}
        {/*                    onBlur={props.handleBlur('Name')}*/}

        {/*                    activeUnderlineColor="#000000"*/}
        {/*                    activeOutlineColor="#000000"*/}
        {/*                    left={<TextInput.Icon name="face"/>}*/}
        {/*                />*/}
        {/*                <Text style={signUpStyle.errorText}>{props.touched.Name && props.errors.Name}</Text>*/}

        {/*            </View>*/}

        {/*            <View style={Nofar_styles.actionInput}>*/}
        {/*                <TextInput*/}
        {/*                    placeholder="אימייל"*/}
        {/*                    // value={state.email}*/}
        {/*                    //*/}
        {/*                    // onChangeText={onChangeEmail}*/}
        {/*                    onChangeText={(email) => {*/}
        {/*                        props.handleChange('Email')(email)*/}
        {/*                        onChangeEmail(email)*/}
        {/*                        setValidEmail(true)*/}
        {/*                    }*/}
        {/*                    }*/}
        {/*                    value={props.values.Email}*/}
        {/*                    onBlur={props.handleBlur('Email')}*/}
        {/*                    error={hasErrors('email', props.values.Email, props.touched.Email)}*/}

        {/*                    activeUnderlineColor="#000000"*/}
        {/*                    activeOutlineColor="#000000"*/}
        {/*                    left={<TextInput.Icon name="email"/>}*/}
        {/*                />*/}
        {/*                {validEmail &&*/}

        {/*                    <Text style={signUpStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>}*/}
        {/*                {!validEmail &&*/}
        {/*                    <Text style={signUpStyle.errorText}>אימייל זה נמצא כבר בשימוש</Text>}*/}
        {/*            </View>*/}

        {/*            <View style={Nofar_styles.actionInput}>*/}
        {/*                <TextInput*/}
        {/*                    placeholder="סיסמה"*/}
        {/*                    // value={state.password}*/}
        {/*                    // onChangeText={onChangePassword}*/}
        {/*                    onChangeText={props.handleChange('Password')}*/}
        {/*                    value={props.values.Password}*/}
        {/*                    secureTextEntry={passwordVisibility}*/}
        {/*                    error={hasErrors('password', props.values.Password, props.touched.Password)}*/}
        {/*                    onBlur={props.handleBlur('Password')}*/}

        {/*                    activeUnderlineColor="#000000"*/}
        {/*                    activeOutlineColor="#000000"*/}
        {/*                    right={<TextInput.Icon onPress={handlePasswordVisibility} name={rightIcon}/>}*/}
        {/*                    left={<TextInput.Icon name="lock"/>}*/}

        {/*                />*/}
        {/*                <Text*/}
        {/*                    style={signUpStyle.errorText}>{props.touched.Password && props.errors.Password}</Text>*/}
        {/*            </View>*/}

        {/*            <View style={Nofar_styles.actionInput}>*/}
        {/*                <TextInput*/}
        {/*                    placeholder="טלפון (*רשות)"*/}
        {/*                    // value={state.phone}*/}
        {/*                    // onChangeText={onChangePhone}*/}
        {/*                    onChangeText={(phone) => {*/}
        {/*                        props.handleChange('PhoneNumber')(phone)*/}
        {/*                        onChangePhone(phone)*/}
        {/*                        console.log(phone)*/}
        {/*                    }}*/}
        {/*                    value={props.values.PhoneNumber}*/}
        {/*                    onBlur={props.handleBlur('PhoneNumber')}*/}
        {/*                    keyboardType='numeric'*/}
        {/*                    activeUnderlineColor="#000000"*/}
        {/*                    activeOutlineColor="#000000"*/}
        {/*                    left={<TextInput.Icon name="phone"/>}*/}
        {/*                />*/}
        {/*                <Text*/}
        {/*                    style={signUpStyle.errorText}>{props.touched.PhoneNumber && props.errors.PhoneNumber}</Text>*/}
        {/*            </View>*/}

        {/*            <View style={signUpStyle.submitButton}>*/}
        {/*                /!*<TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>*!/*/}
        {/*                /!*    <Text style={Nofar_styles.BigButtonText}>עדכן פרטים</Text>*!/*/}
        {/*                /!*</TouchableOpacity>*!/*/}
        {/*                <TouchableOpacity style={Nofar_styles.SmallButton}*/}
        {/*                                  onPress={props.handleSubmit}>*/}
        {/*                    <Text style={Nofar_styles.SmallButtonTitle}>תרשמו אותי!</Text>*/}
        {/*                </TouchableOpacity>*/}
        {/*            </View>*/}
        {/*        </View>*/}
        {/*    )}*/}
        {/*</Formik>*/}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    flex: 1,
  },
  detailsContainer: {
    paddingHorizontal: 4,
    marginTop: -4,
    flexDirection: "column",
    width: "60%",
  },

  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  date: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  distance: {
    color: "black",
  },
  cancelContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  bottomTextView: {
    flexDirection: "row",
  },
  bottomText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    marginRight: "4%",
  },
  bottomView: {
    flexDirection: "row",
    marginHorizontal: "7.5%",
  },
});
