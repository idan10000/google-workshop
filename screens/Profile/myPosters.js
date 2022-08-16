import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Title, Text } from "react-native-paper";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { getPhoneNumber } from "../../shared_components/Firebase.js";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import PostProfileItem from "./PostProfileItem";

export default function MyPosters({
  navigation,
  refreshing,
  refreshPosters,
  data,
  setData,
  isPoster,
  setIsPoster,
}) {
  const { user } = useContext(AuthenticatedUserContext);
  const Name = user.displayName;
  const Email = user.email;
  const [Phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const FlatListItemSeparator = () => {
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

  const getPosters = () => {
    const db = getFirestore();
    const posters = [];
    getDoc(doc(db, "Users", user.uid)).then((userRef) => {
      const data = userRef.data(); // USER'S DATA
      const refs = data.posters;
      if (refs === undefined || refs.length === 0) {
        setIsPoster(false);
      } else {
        setIsPoster(true);
      }
      const promises = [];
      refs.forEach((ref) => {
        promises.push(getDoc(doc(db, "Posters", ref)));
      });
      Promise.all(promises).then((docs) => {
        docs.forEach((doc) => {
          posters.push({ data: doc.data(), id: doc.id });
        });
        setData(posters);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    const effect = async () => {
      await getPhoneNumber(user, setPhone);
      await getPosters();
    };
    effect().then((r) => {});
  }, []);

  if (isLoading)
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./new_background.png")}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#DCA277" />
        </View>
      </ImageBackground>
    );

  if (!isPoster) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./new_background.png")}
      >
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshPosters("Posters")}
              />
            }
            contentContainerStyle={styles.noPostersContainer}
          >
            <Text style={styles.noPostersTitle}>אין מודעות להצגה...</Text>
            <Text style={styles.noPostersParagraph}>
              כשתעלו מודעה על כלב שאבד, תוכלו לצפות בה, לערוך אותה או למחוק אותה
              דרך עמוד זה
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("./new_background.png")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/*<View>*/}
        {/*    <View style={{ flexDirection: "row", marginLeft: "10%" }}>*/}
        {/*        <View style={{ marginTop: 30, marginRight: 10 }}>*/}
        {/*            <Title style={Nofar_styles.BigTitle}>{Name} </Title>*/}
        {/*        </View>*/}
        {/*    </View>*/}

        {/*    <View*/}
        {/*        style={{ flexDirection: "row", marginLeft: "10%", marginTop: "2%" }}*/}
        {/*    >*/}
        {/*        <Icon name="email" color="#000000" size={30} />*/}
        {/*        <Text style={{ color: "#000000", marginLeft: 20, fontSize: 17 }}>*/}
        {/*            {Email}*/}
        {/*        </Text>*/}
        {/*    </View>*/}

        {/*    <View*/}
        {/*        style={{*/}
        {/*            flexDirection: "row",*/}
        {/*            marginLeft: "10%",*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        <Icon name="phone" color="#000000" size={30} />*/}
        {/*        <TextInput*/}
        {/*            style={{*/}
        {/*                color: "#000000",*/}
        {/*                marginLeft: 20,*/}
        {/*                fontSize: 17,*/}
        {/*                textDecorationLine: "underline",*/}
        {/*            }}*/}
        {/*            onChangeText={(newText) => {*/}
        {/*                setPhone(newText);*/}
        {/*                updatePhoneNumber(user, newText);*/}
        {/*            }}*/}
        {/*            defaultValue={Phone}*/}
        {/*        />*/}
        {/*    </View>*/}
        {/*</View>*/}

        {/*<View*/}
        {/*    style={{*/}
        {/*        flexDirection: "row",*/}
        {/*        paddingHorizontal: 10,*/}
        {/*        marginTop: "1%",*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <TouchableOpacity*/}
        {/*        style={styles.MidButton}*/}
        {/*        onPress={pressHandler_supp}*/}
        {/*    >*/}
        {/*        <View*/}
        {/*            justifyContent="center"*/}
        {/*            alignItems="center"*/}
        {/*            flexDirection="row"*/}
        {/*            marginRight="4%"*/}
        {/*        >*/}
        {/*            <Icon name="pen" size={24} color="#FFFFFF" />*/}
        {/*        </View>*/}
        {/*        <Text style={styles.MidButtonTitle}>תמיכה טכנית</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*    <TouchableOpacity*/}
        {/*        style={styles.MidButton}*/}
        {/*        onPress={async () => {*/}
        {/*            signOut(getAuth()).then(() => {});*/}
        {/*            await turnOffNotifications(user);*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        <View*/}
        {/*            justifyContent="center"*/}
        {/*            alignItems="center"*/}
        {/*            flexDirection="row"*/}
        {/*            marginRight="4%"*/}
        {/*        >*/}
        {/*            <Icon name="cancel" size={24} color="#FFFFFF" />*/}
        {/*        </View>*/}
        {/*        <Text style={styles.MidButtonTitle}>התנתקות</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*</View>*/}

        <View style={styles.listContainer}>
          {/*<Title style={styles.foundDog}>המודעות שלי</Title>*/}
          <FlatList
            data={data}
            ItemSeparatorComponent={FlatListItemSeparator}
            keyExtractor={(item) => item.id}
            numColumns={1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshPosters("Posters")}
              />
            }
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingVertical: 5,
                  }}
                >
                  <PostProfileItem
                    image={item.data.image}
                    date={item.data.date}
                    name={item.data.dogName}
                    address={item.data.address}
                    description={item.data.description}
                    data={item.data}
                    navigation={navigation}
                    destination={"Poster"}
                    id={item.id}
                    refreshPosts={refreshPosters}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  foundDog: {
    fontWeight: "700",
    marginLeft: "7.5%",
    lineHeight: 35,
    color: "#9E6C6C",
    fontSize: 24,
    // textDecorationLine: "underline",
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
    width: "45%",
    height: "60%",
    marginLeft: "2%",
    marginBottom: "7%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11.111,
    backgroundColor: "#DCA277",
  },
  listContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  noPostersTitle: {
    color: "#777777",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 40,
  },
  noPostersParagraph: {
    color: "#777777",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  noPostersContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
