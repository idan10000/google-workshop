import React from "react";
import { View, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { Title, Caption, Text, TouchableRipple } from "react-native-paper";
import { user_styles } from "./User_profile_style";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "../utils/avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../utils/Nofar_style";

export default function ProfileScreen() {
  const userDetalies = {
    name: "אמיר כהן",
    userName: "queenOfEngland18",
    country: "ישראל",
    city: "אילת",
    phone: "052-1111111",
    email: "abc@gmail.com",
  };
  // const pressHandler = () => {
  //   navigation.push("Edit");
  // };
  return (
    <SafeAreaView style={Nofar_styles.container}>
      <View style={user_styles.ProfileCard}>
        <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
          <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          />
          <View style={{ marginTop: 30, marginRight: 10 }}>
            <Title style={Nofar_styles.BigTitle}>{userDetalies.name}</Title>
          </View>
        </View>

        <View style={{ marginTop: 5, marginLeft: 40, marginBottom: 10 }}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {userDetalies.city}, {userDetalies.country}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {userDetalies.email}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {userDetalies.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 40 }}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Icon name="heart-outline" color="#FFFFFF" size={25} />
          <Text style={Nofar_styles.BigButtonText}>הצג מודעות ודיווחים</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 40 }}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Icon name="account-edit" color="#FFFFFF" size={25} />
          <Text style={Nofar_styles.BigButtonText}>עדכון פרטים</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 40 }}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Icon name="share-outline" color="#FFFFFF" size={25} />
          <Text style={Nofar_styles.BigButtonText}>שתף אפליקציה</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 40 }}>
        <TouchableOpacity style={Nofar_styles.BigButton} onPress={() => {}}>
          <Icon name="account-check-outline" color="#FFFFFF" size={25} />
          <Text style={Nofar_styles.BigButtonText}>תמיכה טכנית</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
