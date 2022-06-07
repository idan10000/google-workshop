import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useEffect, useState } from "react";

export default function Map({ startLocation }) {
  const sheetRef = React.useRef(null);
  // user live location :
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <Marker
          coordinate={pin}
          pinColor="red"
          draggable={false}
          // onDragStart={(e) => {
          //   console.log("Drag start", e.nativeEvent.coordinates);
          // }}
          // onDragEnd={(e) => {
          //   setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //   });
          // }}
        >
          <Callout>
            <Text>I'm here!</Text>
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
