import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Nofar_styles } from "../styles/NofarStyle";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";

export default function InsertUsername({ navigation, username, setUsername }) {
  const [userName, setUserNameLocal] = useState();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  });
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/new_background.png")}
    >
      <View style={Nofar_styles.container}>
        <View style={styles.logoHeaderContainer}>
          <TouchableOpacity>
            <Image
              source={require("../assets/findog_logo_1024_big.png")}
              style={styles.appLogo}
            />
          </TouchableOpacity>

        </View>
        <View style={Nofar_styles.actionInput}>
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: "5%",
            }}
          >
            אנא הכניסו שם משתמש
          </Text>
        </View>
        <View style={Nofar_styles.actionInput}>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="הכנס שם"
            activeUnderlineColor="#000000"
            activeOutlineColor="#000000"
            onChangeText={(username) => setUserNameLocal(username)}
          />
        </View>
        <View style={styles.bottomView}>
          <View style={{ marginRight: "1.5%", paddingTop: "1.5%" }}>
            <Icon name="infocirlceo" size={18} color="#000" />
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>
              זהו השם אותו יראו משתמשים אחרים כשתעלו מודעות/דיווחים
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setUsername(userName);
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
            <Text style={Nofar_styles.TinyButtonTitle}>סיימתי!</Text>
          </View>
        </TouchableOpacity>
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
  },
  bottomView: {
    marginVertical: "2%",
    flexDirection: "row",
    marginHorizontal: "7.5%",
  },
  appLogo: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2,
    resizeMode: "stretch",
  },
  logoHeaderContainer: {
    marginTop: "10%",
    marginBottom: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
