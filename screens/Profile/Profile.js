import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
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
  console.log(user.uid);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState(getPhoneNumber(user));

  // const Posters = getPosters(user);
  // should have an id, dogName, date
  // console.log(Posters);

  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };
  // const renderItem = ({ item }) => (
  //   <View style={{ flexDirection: "row", marginLeft: "10%" }}>
  //     <Button onPress={(item) => {}}>
  //       <Icon name="setting" color="#777777" size={20} />
  //     </Button>
  //     <Button
  //       onPress={(item) => {
  //         deletePoster(item.id);
  //       }}
  //     >
  //       <Icon name="delete" color="#777777" size={20} />
  //     </Button>
  //     <Title style={{ color: "#777777" }}>{item.dogName}</Title>
  //   </View>
  // );

  return (
    <SafeAreaView style={Nofar_styles.container}>
      <ScrollView>
        <View style={user_styles.ProfileCard}>
          <View style={{ flexDirection: "row", marginLeft: "10%" }}>
            <View style={{ marginTop: 30, marginRight: 10 }}>
              <Title style={Nofar_styles.BigTitle}>{Name}</Title>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", marginLeft: "10%", marginTop: "2%" }}
          >
            <Icon name="email" color="#777777" size={30} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{Email}</Text>
          </View>

          <View
            style={{ flexDirection: "row", marginLeft: "10%", marginTop: "5%" }}
          >
            <Icon name="phone" color="#777777" size={30} />
            <TextInput
              style={{ color: "#777777", marginLeft: 20 }}
              onChangeText={(newText) => {
                setPhone(newText);
                updatePhoneNumber(user, newText);
              }}
              defaultValue={Phone}
            />
          </View>
        </View>

        <View style={user_styles.confirmBTContainer}>
          <Button
            mode={"contained"}
            style={Nofar_styles.BigButton}
            onPress={pressHandler_supp}
          >
            <Text style={Nofar_styles.BigButtonText}>תמיכה טכנית</Text>
          </Button>
        </View>
        <View style={user_styles.confirmBTContainer}>
          <TouchableOpacity
            style={user_styles.profileButton}
            onPress={() => {
              signOut(getAuth()).then(() => {});
            }}
          >
            <Text style={user_styles.BigButtonText}>התנתקות מהאפליקציה</Text>
          </TouchableOpacity>
        </View>
        <Title style={Nofar_styles.BigTitle}>מודעות שפרסמת</Title>
        {/* <FlatList
          data={Posters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
