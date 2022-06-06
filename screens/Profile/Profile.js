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

export default function ProfilePage({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  getPhoneNumber(user, setPhone);

  const [data, setData] = useState({
    docs: [],
    error: null,
    lastDocId: null,
    initialBatchStatus: "",
    nextBatchStatus: "",
  });

  var FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const pressHandler_supp = () => {
    navigation.navigate("SupportScreen");
  };
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
        <View style={styles.listContainer}>
          <FlatList
            data={data.docs}
            ItemSeparatorComponent={FlatListItemSeparator}
            keyExtractor={(item) => item.image}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 5 }}>
                  <PostListItem
                    image={item.image}
                    date={item.date}
                    distance={item.distance}
                    data={item}
                    navigation={navigation}
                    destination={destination}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  foundDog: {
    fontWeight: "700",
    marginTop: "14%",
    marginBottom: "3%",
    lineHeight: 35,
    color: "#9E6C6C",
    fontSize: 27,
    textAlign: "center",
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
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
