import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
} from "react-native";
import * as Location from "expo-location";
import MapView, {
  Callout,
  Circle,
  Marker,
  MyCustomMarkerView,
} from "react-native-maps";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  collection,
} from "firebase/firestore";
import { async } from "@firebase/util";

export default function Map({ navi }) {
  const sheetRef = React.useRef(null);
  // user live location :
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAllReports = async () => {
    const db = getFirestore();
    const reports = [];
    const querySnapshot = await getDocs(collection(db, "Reports"));
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      let pair = { key: doc.id };
      obj = { ...obj, pair };
      console.log(obj.pair.key);
      reports.push(obj);
    });
    setData(reports);
    console.log(
      "---------------------------------------------------------------------------------DATA",
      data
    );
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
        {data.map((marker) => (
          <Marker
            key={marker.pair.key}
            coordinate={marker.location}
            pinColor="blue"
            draggable={false}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                {/* <Text>
                  <Image source={{ uri: marker.image }} style={styles.image} />
                </Text> */}

                {/* <Text>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: marker.image }}
                    resizeMode="cover"
                  />
                </Text> */}

                <WebView
                  style={{ height: 100, width: 230 }}
                  source={{ uri: marker.image }}
                />
                <Text style={styles.calloutHeaderText}>{marker.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        <Marker coordinate={pin} pinColor="red" draggable={false}>
          <Callout>
            <Text>You're here!</Text>
          </Callout>
        </Marker>
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
  image: {
    height: Dimensions.get("window").height / 4.2,
    width: Dimensions.get("window").width / 4.2,
  },

  map: {
    marginVertical: "2.5%",
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignSelf: "center",
    height: Dimensions.get("window").height / 1.2,
  },
  calloutContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  calloutHeaderText: {
    fontSize: 12,
  },
});
