import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

// ------------ TO DO LIST: --------------
// 1) Add two red pins of reports + BottomSheets
// 2) Navigation from the navigationBar
// 3) Navigation from the create poster\ report

export default function Map() {
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

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //user location
  const [pin, setPin] = React.useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
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
          strokeWidth={5}
          strokeColor={"red"}
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// export default function App() {
//   const renderContent = () => (
//     <View
//       style={{
//         backgroundColor: "lightgrey",
//         padding: 20,
//         height: 450,
//       }}
//     >
//       <Text>Swipe down to close</Text>
//     </View>
//   );

//   const sheetRef = React.useRef(null);

//   return (
//     <>
//       <View>
//         <Button
//           title="Open Bottom Sheet"
//           onPress={() => sheetRef.current.snapTo(0)}
//         />
//       </View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={["25%", "10%", "0%"]}
//         borderRadius={30}
//         initialSnap={2}
//         enabledGestureInteraction={true}
//         renderContent={renderContent}
//       />
//     </>
//   );
// }
