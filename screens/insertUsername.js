import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Nofar_styles} from "../styles/NofarStyle";
import {signUpStyle} from "../styles/SignUpStyle";
import {TextInput} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import {getAuth, PhoneAuthProvider} from "firebase/auth";

export default function InsertUsername({ username, setUsername }) {
  const [userName, setUserNameLocal] = React.useState();

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/new_background.png")}>

    <View style={Nofar_styles.container}>
      <View style={signUpStyle.logoHeaderContainer}>
        <TouchableOpacity>
          <Image
              source={require("../assets/findog_logo_1024_big.png")}
              style={styles.appLogo}
          />
        </TouchableOpacity>
        {/*<View style={Nofar_styles.BigTitle}>*/}
        {/*  <Text style={Nofar_styles.BigTitle}>ברוכים הבאים{"\n"}אל Findog</Text>*/}
        {/*</View>*/}
      </View>
      <View style={Nofar_styles.actionInput}>
        <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom:"5%",
            }}
        >
          אנא הכניסו שם משתמש
        </Text>
      </View>
      <View style={Nofar_styles.actionInput}>
        <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="הכנס שם"
            autoFocus
            autoCompleteType="tel"
            onChangeText={( username) => setUserNameLocal( username)}
        />
      </View>
      <View style={styles.bottomView}>
        <View style={{marginRight:"1.5%", paddingTop:"1.5%"}}>

          <Icon name="infocirlceo" size={18} color="#000" /></View>
        <View style={styles.bottomTextView}>
          <Text style={styles.bottomText}>
            זהו השם אותו יראו משתמשים אחרים כשתעלו מודעות/דיווחים
          </Text>
        </View>
        <TouchableOpacity
            onPress={async () => {
              setUsername(username)
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
            <Text style={Nofar_styles.TinyButtonTitle}>
              סיימתי!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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

  },  bottomText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomView: {
    marginVertical:"2%",
    flexDirection: "row",
    marginHorizontal: "7.5%",

  },
  appLogo:{
    alignItems: 'center',
    marginTop:'8%',
    justifyContent: 'center',
    height:Dimensions.get("window").height/3,
    width: Dimensions.get("window").width/2.2 ,
    resizeMode: 'contain',
    marginRight:"2%"
  },
});
