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

export default function MyReports({
  navigation,
  refreshing,
  refreshReports,
  data,
  setData,
  isReport,
  setIsReport,
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


  const getReports = () => {
    const db = getFirestore();
    const reports = [];
    getDoc(doc(db, "Users", user.uid)).then((userRef) => {
      const data = userRef.data(); // USER'S DATA
      const refs = data.reports;
      if (refs === undefined || refs.length === 0) {
        setIsReport(false);
      } else {
        setIsReport(true);
      }
      const promises = [];
      refs.forEach((ref) => {
        promises.push(getDoc(doc(db, "Reports", ref)));
      });
      Promise.all(promises).then((docs) => {
        docs.forEach((doc) => {
          reports.push({ data: doc.data(), id: doc.id });
        });
        setData(reports);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    const effect = async () => {
      await getPhoneNumber(user, setPhone);
      await getReports();
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

  if (!isReport) {
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
                onRefresh={() => refreshReports("Reports")}
              />
            }
            contentContainerStyle={styles.noReportsContainer}
          >
            <Text style={styles.noReportsTitle}>אין דיווחים להצגה...</Text>
            <Text style={styles.noReportsParagraph}>
              כשתעלו דיווח על כלב שמצאתם, תוכלו לצפות בו, לערוך אותו או למחוק
              אותו דרך עמוד זה
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

        <View style={styles.listContainer}>
          <FlatList
            data={data}
            ItemSeparatorComponent={FlatListItemSeparator}
            keyExtractor={(item) => item.id}
            numColumns={1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshReports("Reports")}
              />
            }
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 5 }}>
                  <PostProfileItem
                    image={item.data.image}
                    date={item.data.date}
                    name={item.data.dogName}
                    address={item.data.address}
                    description={item.data.description}
                    data={item.data}
                    navigation={navigation}
                    destination={"Report"}
                    id={item.id}
                    refreshPosts={refreshReports}
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
  noReportsTitle: {
    color: "#777777",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 40,
  },
  noReportsParagraph: {
    color: "#777777",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  noReportsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
