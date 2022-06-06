import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect, useState } from "react";

export default function MapForCreation({
  preLocation,
  usePreLocation,
  location,
  setLocation,
}) {
  // user live location :
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (usePreLocation) {
      setLocation(preLocation);
      setPin({
        latitude: preLocation.latitude,
        longitude: preLocation.longitude,
      });
      console.log(location);
      setIsLoading(false);
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let newLocation = await Location.getCurrentPositionAsync({});
        setLocation(newLocation.coords);
        setPin({
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        });
        setIsLoading(false);
      })();
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
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
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0029,
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          pinColor="red"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            const newLocation = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            };
            setPin(newLocation);
            setLocation(newLocation);
          }}
        >
          <Callout>
            <Text>I'm here!</Text>
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
  map: {
    marginVertical: "2.5%",
    width: Dimensions.get("window").width / 1.2,
    justifyContent: "center",
    alignSelf: "center",
    height: Dimensions.get("window").height / 1.8,
  },
});
