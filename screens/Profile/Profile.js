import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { user_styles } from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../../styles/NofarStyle";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import {
  getPhoneNumber,
  updatePhoneNumber,
} from "../../shared_components/Firebase";
import { getAuth, signOut } from "firebase/auth";
import { turnOffNotifications } from "../../shared_components/NotificationsUtils";

export default function ProfilePage({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  const [data, setData] = useState([]);

  const posterReportPage1 = () => {
    navigation.navigate("MyReports");
  };
  const posterReportPage2 = () => {
    navigation.navigate("MyPosters");
  };

  const pressHandler = () => {
    navigation.navigate("EditProfileScreen");
  };
  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };

  useEffect(() => {
    const effect = async () => {
      await getPhoneNumber(user, setPhone);
    };
    effect().then((r) => {});
  }, []);
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("./new_background.png")}
    >
      <SafeAreaView>
        <View style={user_styles.ProfileCard}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "10%",
              marginLeft: "10%",
            }}
          >
            {/* <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          /> */}
            <Title style={Nofar_styles.BigTitle}>{Name}</Title>
          </View>

          <View
            style={{ marginTop: 5, marginLeft: "15%", marginBottom: "15%" }}
          >
            {/*<View style={{ flexDirection: "row", marginTop: "5%" }}>*/}
            {/*    <Icon name="email" color="#777777" size={30} />*/}
            {/*    <Text style={{ color: "#777777", marginLeft: "3%", fontSize:20}}>*/}
            {/*        {Email}*/}
            {/*    </Text>*/}
            {/*</View>*/}

            <View style={{ flexDirection: "row", marginTop: "5%" }}>
              <Icon name="phone" color="#777777" size={27} />
              <Text
                style={{
                  color: "#000000",
                  marginLeft: "4%",
                  fontSize: 17,
                }}
              >
                {Phone}
              </Text>
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

        {/*<View style={user_styles.confirmBTContainer}>*/}
        {/*  <TouchableOpacity*/}
        {/*      style={user_styles.profileButton}*/}
        {/*      onPress={pressHandler_supp}*/}
        {/*  >*/}
        {/*      <View*/}
        {/*          justifyContent="center"*/}
        {/*          alignItems="center"*/}
        {/*          flexDirection="row"*/}
        {/*          marginRight="4%"*/}
        {/*      >*/}
        {/*          <Icon name="pen" size={24} color="#FFFFFF" />*/}
        {/*      </View>*/}
        {/*    <Text style={user_styles.BigButtonText}>תמיכה טכנית</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}

        <View style={user_styles.confirmBTContainer}>
          <TouchableOpacity
            style={user_styles.profileButton}
            onPress={async () => {
              signOut(getAuth()).then(() => {});
              await turnOffNotifications(user);
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
            <Text style={user_styles.BigButtonText}>התנתקות</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
