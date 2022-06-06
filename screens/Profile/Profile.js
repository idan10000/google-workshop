import React, {useContext, useEffect, useState} from "react";
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
import {getInitialData} from "../BrowsePage/InfiniteScroll";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import PostListItem from "../../shared_components/PostListItem";

export default function ProfilePage({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  console.log("------- User Phone number is:", Phone);

  const [data, setData] = useState([]);

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


    const getPosters = () => {
      const db = getFirestore()
      const posters = []
      getDoc(doc(db, "Users", user.uid)).then(userRef => {
        const data = userRef.data()
        const refs = data.posters
        const promises = []

        refs.forEach(ref => {
          promises.push(getDoc(doc(db, "Posters", ref)))
        })
        Promise.all(promises).then(docs => {
          docs.forEach(doc => {
            posters.push(doc.data())
          })
          setData(posters)
        })
      })
    }
    // const userItem = userSnapshot.data()
    // console.log(userItem.test)
    // console.log(userItem)
    // if (userItem.test) {
    //   getDoc(userItem.test).then(res => {
    //     console.log(res)
    //   })
    // }
    // const reportRefs = userItem.reports
    // console.log(reportRefs[0])
    // const reports = []
    // reportRefs.foreach((item) => {
    //   console.log(item)
    // })

  useEffect(async () => {
    await getPhoneNumber(user, setPhone);
    await getPosters()
  }, []);

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
            data={data}
            ItemSeparatorComponent={FlatListItemSeparator}
            keyExtractor={(item) => item.image}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 5 }}>
                  <PostListItem
                    image={item.image}
                    date={item.date}
                    distance={0}
                    data={item}
                    navigation={navigation}
                    destination={"Poster"}
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
