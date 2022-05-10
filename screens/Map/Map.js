import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

// ------------ TO DO LIST: --------------
// 1) Add two red pins of reports + BottomSheets
// 2) Navigation from the navigationBar
// 3) Navigation from the create poster\ report

export default function Map() {
  // buttom sheet:
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "lightgrey",
        padding: 20,
        height: 450,
      }}
    >
      <Image source={{}}></Image>
    </View>
  );

  const sheetRef = React.useRef(null);

  // user live location :
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log(status);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
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
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [reportOne, setReportOne] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={reportOne}
          pinColor="blue"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setReportOne({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          onPress={() => sheetRef.current.snapTo(0)}
        >
          <Callout>
            <Text>Match!</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={pin}
          pinColor="red"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle
          center={pin}
          radius={3000}
          strokeWidth={8}
          strokeColor={"red"}
        />
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["25%", "10%", "0%"]}
        borderRadius={30}
        initialSnap={2}
        enabledGestureInteraction={true}
        renderContent={renderContent}
      />
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
