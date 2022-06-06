import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { user_styles } from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../../styles/NofarStyle";
import { getAuth, signOut } from "firebase/auth";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
// import { turnOffNotifications } from "../../shared_components/NotificationsUtils";
import {
  getPhoneNumber,
  updatePhoneNumber,
  getPosters,
  deletePoster,
} from "../../shared_components/Firebase.js";
// 1) user data-  Name + email ---------------------------------- V
// 2) update user phone number, with input object --------------- V
// 3) buttons for support and signOut --------------------------- V
// 4) all user posters (with update\delete buttons)--------------
export default function ProfilePage({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  getPhoneNumber(user, setPhone);
  console.log("------- User Phone number is:", Phone);

  // const Posters = getPosters(user);
  // // should have an id, dogName, date

  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };
  // const renderItem = ({ item }) => (
  //   <View style={{ flexDirection: "row", marginLeft: "10%" }}>
  //     <Button onPress={(item) => {}}>
  //       <Icon name="setting" color="#000000" size={20} />
  //     </Button>
  //     <Button
  //       onPress={(item) => {
  //         deletePoster(item.id);
  //       }}
  //     >
  //       <Icon name="delete" color="#000000" size={20} />
  //     </Button>
  //     <Title style={{ color: "#000000" }}>{item.dogName}</Title>
  //   </View>
  // );

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("./new_background.png")}
    >
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row", marginLeft: "10%" }}>
            <View style={{ marginTop: 30, marginRight: 10 }}>
              <Title style={Nofar_styles.BigTitle}>{Name} </Title>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", marginLeft: "10%", marginTop: "2%" }}
          >
            <Icon name="email" color="#000000" size={30} />
            <Text style={{ color: "#000000", marginLeft: 20, fontSize: 17 }}>
              {Email}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: "10%",
              marginTop: "5%",
              marginBottom: "10%",
            }}
          >
            <Icon name="phone" color="#000000" size={30} />
            <TextInput
              style={{
                color: "#000000",
                marginLeft: 20,
                fontSize: 17,
                textDecorationLine: "underline",
              }}
              onChangeText={(newText) => {
                setPhone(newText);
                updatePhoneNumber(user, newText);
              }}
              defaultValue={Phone}
            />
          </View>
        </View>
        <View>
          <View style={user_styles.confirmBTContainer}>
            <TouchableOpacity
              style={styles.MidButton}
              onPress={pressHandler_supp}
            >
              <View
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                marginRight="4%"
              >
                <Icon name="pen" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.MidButtonTitle}>תמיכה טכנית</Text>
            </TouchableOpacity>
          </View>
          <View style={user_styles.confirmBTContainer}>
            <TouchableOpacity
              style={styles.MidButton}
              onPress={() => {
                signOut(getAuth()).then(() => {});
              }}
            >
              <View
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                marginRight="4%"
              >
                <Icon name="cancel" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.MidButtonTitle}>התנתקות</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Title style={styles.foundDog}>המודעות שלך</Title>
        {/* <FlatList
          data={Posters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  foundDog: {
    marginTop: "14%",
    marginBottom: "3%",
    lineHeight: 35,
    color: "#9E6C6C",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  MidButtonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  MidButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 6,
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.08,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11.111,
    backgroundColor: "#DCA277",
  },
});
