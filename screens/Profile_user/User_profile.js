import React from "react";
import { View, SafeAreaView, Button } from "react-native";
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
    <SafeAreaView style={user_styles.container}>
      <View style={user_styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          />
          <View style={{ marginRight: 20 }}>
            <Title
              style={[
                user_styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {userDetalies.name}
            </Title>
            <Caption style={user_styles.caption}>
              {userDetalies.userName}
            </Caption>
          </View>
        </View>
      </View>

      {/* user details: */}
      <View style={user_styles.userInfoSection}>
        <View style={user_styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetalies.city}, {userDetalies.country}
          </Text>
        </View>
        <View style={user_styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetalies.phone}
          </Text>
        </View>
        <View style={user_styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetalies.email}
          </Text>
        </View>
      </View>

      {/* dowm bottoms: */}
      <View style={user_styles.menuWrapper}>
        <View style={user_styles.menuItem}>
          <Icon name="heart-outline" color="#FF6347" size={25} />
          <Button
            title="הצגת מודעות ודיווחים"
            style={user_styles.menuItemText}
            onPress={() => {}}
          />
        </View>
        <View style={user_styles.menuItem}>
          <Icon name="account-edit" color="#FF6347" size={25} />
          <Button
            title="עדכון פרטי משתמש"
            style={user_styles.menuItemText}
            onPress={() => {}}
          />
        </View>
        <View style={user_styles.menuItem}>
          <Icon name="share-outline" color="#FF6347" size={25} />
          <Button
            title="שיתוף אפליקציה"
            style={user_styles.menuItemText}
            onPress={() => {}}
          />
        </View>
        <View style={user_styles.menuItem}>
          <Icon name="account-check-outline" color="#FF6347" size={25} />
          <Button
            title="תמיכה טכנית"
            style={user_styles.menuItemText}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
