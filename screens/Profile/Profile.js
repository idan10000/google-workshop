import React, {useContext, useEffect, useState} from "react";
import {View, SafeAreaView, TouchableOpacity, TextInput, ImageBackground} from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { user_styles } from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../../styles/NofarStyle";
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";
import {getPhoneNumber, updatePhoneNumber} from "../../shared_components/Firebase";
import {getAuth, signOut} from "firebase/auth";
import {turnOffNotifications} from "../../shared_components/NotificationsUtils";

export default function ProfilePage({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  const [data, setData] = useState([]);

  const posterReportPage1 = () => {
    navigation.navigate("FirstProfile");
  };
    const posterReportPage2 = () => {
        navigation.navigate("SecondProfile");
    };

  // const userDetalies = {
  //   name: "אמיר כהן",
  //   userName: "queenOfEngland18",
  //   country: "ישראל",
  //   city: "אילת",
  //   phone: "052-1111111",
  //   email: "abc@gmail.com",
  // };
  const pressHandler = () => {
    navigation.navigate("EditProfileScreen");
  };
  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };
    useEffect(async () => {
        await getPhoneNumber(user, setPhone);
    }, []);
  return (
      <ImageBackground
          style={{ flex: 1 }}
          source={require("./new_background.png")}
      >
      <SafeAreaView >
        <View style={user_styles.ProfileCard}>
          <View style={{ flexDirection: "row", marginTop: "5%", marginLeft: "10%" }}>
            {/* <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          /> */}
            <Title style={Nofar_styles.BigTitle}>{Name}</Title>
          </View>

          <View style={{ marginTop: 5, marginLeft: "15%", marginBottom: "5%" }}>
            <View style={{ flexDirection: "row", marginTop: "5%" }}>
                <Icon name="email" color="#777777" size={30} />
                <Text style={{ color: "#777777", marginLeft: "3%", fontSize:20}}>
                    {Email}
                </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: "5%" }}>
              <Icon name="phone" color="#777777" size={30} />
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
        </View>

        <View style={user_styles.confirmBTContainer}>
          <TouchableOpacity
              style={user_styles.profileButton}
              onPress={posterReportPage1}
          >
              <View
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  marginRight="4%"
              >
                  <Icon name="card-text" size={24} color="#FFFFFF" />
              </View>
            <Text style={user_styles.BigButtonText}>הצגת דיווחים</Text>
          </TouchableOpacity>
        </View>
          <View style={user_styles.confirmBTContainer}>
              <TouchableOpacity
                  style={user_styles.profileButton}
                  onPress={posterReportPage2}
              >
                  <View
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="row"
                      marginRight="4%"
                  >
                      <Icon name="post" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={user_styles.BigButtonText}>הצגת מודעות</Text>
              </TouchableOpacity>
          </View>

        <View style={user_styles.confirmBTContainer}>
          <TouchableOpacity
              style={user_styles.profileButton}
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
            <Text style={user_styles.BigButtonText}>תמיכה טכנית</Text>
          </TouchableOpacity>
        </View>

        <View style={user_styles.confirmBTContainer}>
          <TouchableOpacity
              style={user_styles.profileButton}
              onPress={async () => {
                  signOut(getAuth()).then(() => {});
                  await turnOffNotifications(user);
              }}          >
              <View
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  marginRight="4%"
              >
                  <Icon name="cancel" size={24} color="#FFFFFF" />
              </View>
            <Text style={user_styles.BigButtonText}>התנתקות</Text>
          </TouchableOpacity>
        </View>

        {/*<View style={user_styles.confirmBTContainer}>*/}
        {/*  <TouchableOpacity*/}
        {/*    style={user_styles.profileButton}*/}
        {/*    onPress={pressHandler_supp}*/}
        {/*  >*/}
        {/*    <Text style={user_styles.BigButtonText}>תמיכה טכנית</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </SafeAreaView>
      </ImageBackground>
  );
}
