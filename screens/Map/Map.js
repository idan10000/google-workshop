import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, {
  Callout,
  Circle,
  Marker,
  MyCustomMarkerView,
} from "react-native-maps";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function Map({ navi }) {
  const sheetRef = React.useRef(null);
  // user live location :
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAllReports = () => {
    const db = getFirestore();
    const reports = [];
    getDoc(doc(db, "Reports")).then((tableRef) => {
      const promises = [];
      tableRef.data().forEach((ref) => {
        promises.push(getDoc(doc(db, "Reports", ref)));
      });
      Promise.all(promises).then((docs) => {
        docs.forEach((doc) => {
          reports.push(doc.data());
        });
        setData(reports);
      });
    });
    console.log("-----------DATA", data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
      setPin({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      });
      console.log(location);
      setIsLoading(false);
      await getAllReports(); // new line
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  //user location
  const [pin, setPin] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {/* {data.map((marker) => (
          <Marker
            coordinate={marker.location}
            pinColor="blue"
            draggable={false}
            image={{ uri: marker.image }}
            onPress={(e) => {}}
          >
            <Callout>
              <Text>VIEW REPORT!</Text>
            </Callout>
          </Marker>
        ))} */}

        <Marker coordinate={pin} pinColor="red" draggable={false}>
          <Callout>
            <Text>You're here!</Text>
          </Callout>
        </Marker>
        <Circle
          center={pin}
          radius={1000}
          strokeWidth={5}
          strokeColor={"grey"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    marginVertical: "2.5%",
    width: Dimensions.get("window").width / 1.2,
    justifyContent: "center",
    alignSelf: "center",
    height: Dimensions.get("window").height / 1.5,
  },
});
