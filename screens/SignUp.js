import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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

  getDoc,
} from "firebase/firestore";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { getApp } from "firebase/app";
import { stylesPoster } from "./CreatePoster/CreatePosterStyle";
import Icon from "react-native-vector-icons/AntDesign";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

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

export default function SignUp({
  navigation,
  username,
  setUsername,
  setIsLoading,
}) {
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
    if (det === "email") {
      return touched && !val.includes("@");
    }
    if (det === "name") {
      return touched && val.localeCompare(" ");
    }
    if (det === "phone") {
      return touched && !val.match(phoneRegExp);
    }
    if (det === "password") {
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



  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  // Handle user state changes
  async function onAuthStateChanged(authenticatedUser) {

    if (authenticatedUser) {
      setUser(authenticatedUser);
      const userRef = doc(fireStoreDB, "Users", authenticatedUser.uid);

      getDoc(userRef).then(async (userSnap) => {
        if (userSnap.exists()) {
          setUsername(userSnap.data().name);
        } else {
          setUsername("");
        }
        setIsLoading(false);
      });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return fireAuth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  async function handleSubmitPress(props) {
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

      });
  }

  useEffect(() => {
    if (user && username === "") {
      navigation.navigate("InsertUsername");
    }
  });
  const formRef = useRef();
  const [validEmail, setValidEmail] = useState(true);

  // ------------------------------------------ reCaptcha ------------------------------------------
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const app = getApp();
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const [phoneError, setPhoneError] = React.useState("");
  const attemptInvisibleVerification = false;
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [visibleVerification, setVisibleVerification] = React.useState(false);
  const modalConfirmPressHandler = () => {
    setVisibleVerification(false);
  };
  const phoneRegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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
              ברוכים הבאים{"\n"}ל-Findog
            </Text>
          </View>
        </View>


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
            style={{ marginVertical: "2%", fontSize: 17 }}
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
        {phoneError !== "" && (
          <Text
            style={{
              color: "red",
              fontSize: 15,
              marginBottom: "5%",
              marginHorizontal: "8%",
            }}
          >
            {phoneError}
          </Text>
        )}
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
            let phone = phoneNumber;
            let phoneOK = false;
            if (
              !phoneRegExp.test(phone) ||
              (phone[0] !== "+" && phone[0] !== "0")
            ) {
              setPhoneError("אנא הכניסו מספר טלפון חוקי");
            } else {
              setPhoneError("");
              phoneOK = true;
              if (phone[0] === "0") {
                phone = "+972" + phone.substring(1);
              }
            }

            if (phoneOK) {
              try {
                setIsModalLoading(true);
                setVisibleVerification(true);
                const phoneProvider = new PhoneAuthProvider(getAuth());

                const verificationId = await phoneProvider
                  .verifyPhoneNumber(phone, recaptchaVerifier.current)
                  .catch((err) => {
                    console.log(err);
                  });
                setVerificationId(verificationId);

                setIsModalLoading(false);
              } catch (err) {
                showMessage({ text: `מספר טלפון לא חוקי`, color: "red" });
              }
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
            {isModalLoading ? (
              <View style={Nofar_styles.actionInput}>
                <ActivityIndicator size="large" color="#DCA277" />
              </View>
            ) : (
              <View>
                <View style={Nofar_styles.actionInput}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 17,
                    }}
                  >
                    אנא הכניסו את קוד האימות, שנשלח למספר הטלפון שהזנתם
                  </Text>
                </View>
                <View style={Nofar_styles.actionInput}>
                  <TextInput
                    style={{
                      marginTop: "5%",
                      marginBottom: "1%",
                      fontSize: 17,
                    }}
                    editable={!!verificationId}
                    placeholder="הכניסו 6 ספרות"
                    keyboardType="phone-pad"
                    onChangeText={setVerificationCode}
                    activeUnderlineColor="#000000"
                    activeOutlineColor="#000000"
                  />
                </View>
                {message ? (
                  <Text
                    style={{
                      color: message.color || "#DCA277",
                      fontSize: 17,
                      marginBottom: "2.5%",
                      marginHorizontal: "10%",
                    }}
                  >
                    {message.text}
                  </Text>
                ) : undefined}
                {verificationId && (
                  <TouchableOpacity
                    onPress={async () => {
                      try {

                        const credential = PhoneAuthProvider.credential(
                          verificationId,
                          verificationCode
                        );
                        const userCredential = await signInWithCredential(
                          getAuth(),
                          credential
                        );
                        setVisibleVerification(false);

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
                        marginTop: "5%",
                        marginBottom: "5%",
                      }}
                    >
                      <Text style={Nofar_styles.TinyButtonTitle}>אישור</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
              </View>
            )}
          </Modal>
        </Portal>


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
