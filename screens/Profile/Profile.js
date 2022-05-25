import React from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { user_styles } from "./ProfileStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../../styles/NofarStyle";
import {getAuth, signOut} from "firebase/auth";

export default function ProfilePage({ navigation }) {
  const userDetalies = {
    name: "אמיר כהן",
    userName: "queenOfEngland18",
    country: "ישראל",
    city: "אילת",
    phone: "052-1111111",
    email: "abc@gmail.com",
  };
  const pressHandler = () => {
    navigation.navigate("EditProfileScreen");
  };
  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };

  return (
    <SafeAreaView style={Nofar_styles.container}>
      <View style={user_styles.ProfileCard}>
        <View style={{ flexDirection: "row", marginTop: "5%", marginLeft: "10%" }}>
          {/* <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          /> */}
            <Title style={Nofar_styles.BigTitle}>{userDetalies.name}</Title>
        </View>

        <View style={{ marginTop: 5, marginLeft: "15%", marginBottom: "5%" }}>
          <View style={{ flexDirection: "row", marginTop: "5%" }}>
            <Icon name="map-marker-radius" color="#777777" size={30} />
            <Text style={{ color: "#777777", marginLeft: "3%", fontSize:20}}>
              {userDetalies.city}, {userDetalies.country}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: "5%" }}>
            <Icon name="email" color="#777777" size={30} />
            <Text style={{ color: "#777777", marginLeft: "3%", fontSize:20}}>
              {userDetalies.email}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: "5%" }}>
            <Icon name="phone" color="#777777" size={30} />
            <Text style={{ color: "#777777", marginLeft: "3%", fontSize:20}}>
              {userDetalies.phone}
            </Text>
          </View>
        </View>
      </View>

      <View style={user_styles.confirmBTContainer}>
        <TouchableOpacity
          style={user_styles.profileButton}
          onPress={() => {}}
        >
          <Text style={user_styles.BigButtonText}>הצגת מודעות ודיווחים</Text>
        </TouchableOpacity>
      </View>

      <View style={user_styles.confirmBTContainer}>
        <TouchableOpacity
          style={user_styles.profileButton}
          onPress={pressHandler}
        >
          <Text style={user_styles.BigButtonText}>עדכון פרטים</Text>
        </TouchableOpacity>
      </View>

      <View style={user_styles.confirmBTContainer}>
        <TouchableOpacity
          style={user_styles.profileButton}
          onPress={() => {signOut(getAuth()).then(() => {})}}>
        >
          <Text style={user_styles.BigButtonText}>התנתקות מהאפליקציה</Text>
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
  );
}
