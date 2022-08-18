import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Nofar_styles } from "../../styles/NofarStyle";
import Geocoder from "react-native-geocoding";
import { getInitialData } from "../BrowsePage/InfiniteScroll";

export default function MapForCreation({
  preLocation,
  usePreLocation,
  location,
  setLocation,
  nextScreen,
}) {
  // user live location :
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: preLocation.latitude,
    longitude: preLocation.longitude,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0029,
  });
  const [showMap, setShowMap] = useState(true);
  Geocoder.init("AIzaSyAGKKpmqjHELTwvwAx0w0Ed8W2LtQ2lwZg", { language: "iw" });

  useEffect(() => {
    const effect = async () => {
      if (usePreLocation) {
        setLocation(preLocation);
        let json = await Geocoder.from(
          preLocation.latitude,
          preLocation.longitude
        );
        let address = json.results[0].formatted_address;
        setAddress(address.substring(0, address.length - 7));
        setPin({
          latitude: preLocation.latitude,
          longitude: preLocation.longitude,
        });
        setRegion({
          latitude: preLocation.latitude,
          longitude: preLocation.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0029,
        });
        setIsLoading(false);
      } else {
        await (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }
          let newLocation = await Location.getCurrentPositionAsync({});
          setLocation(newLocation.coords);
          let json = await Geocoder.from(
            newLocation.coords.latitude,
            newLocation.coords.longitude
          );
          let address = json.results[0].formatted_address;
          setAddress(address.substring(0, address.length - 7));
          setPin({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0029,
          });
          setIsLoading(false);
        })();
      }
    };
    effect().then((r) => {});
  }, []);

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      ref.current?.blur();
    });

    return () => {
      keyboardHideListener.remove();
    };
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

  const ref = useRef();
  if (isLoading) {
    return (
      <View style={styles.map}>
        <ActivityIndicator size="large" color="#DCA277" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 20,
          zIndex: 100,
          width: "88%",
          right: 3,
          flex: 1,
          marginLeft: "5%",
          marginRight: "5%",
          marginTop: "5%",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder={"חפשו או סמנו במפה את המיקום האחרון של הכלב"}
          query={{
            key: "AIzaSyBOMIn1twPjZskW-EnIjfNaUcSVoiLRpqQ",
            language: "iw",
            components: "country:il",
          }}
          textInputProps={{
            onFocus: () => {
              setShowMap(false);
            },
            onBlur: () => {
              setShowMap(true);
            },
          }}
          ref={ref}
          onPress={async (data, details = null) => {
            setShowMap(true);
            let newLocation = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setRegion({
              ...newLocation,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
            setPin(newLocation);
            setLocation(newLocation);
            let json = await Geocoder.from(
              newLocation.latitude,
              newLocation.longitude
            );
            let address = json.results[0].formatted_address;
            setAddress(address.substring(0, address.length - 7));
          }}
          fetchDetails={true}
        />
      </View>
      {showMap ? (
        <View style={{ marginTop: "5%" }}>
          <MapView
            style={styles.map}
            onRegionChangeComplete={(region) => {
              setRegion(region);
            }}
            region={region}
            provider="google"
          >
            <Marker
              coordinate={pin}
              pinColor="red"
              draggable={true}
              onDragStart={(e) => {}}
              onDragEnd={async (e) => {
                const newLocation = {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                };
                setPin(newLocation);
                setLocation(newLocation);
                let json = await Geocoder.from(
                  newLocation.latitude,
                  newLocation.longitude
                );
                let address = json.results[0].formatted_address;
                setAddress(address.substring(0, address.length - 7));
              }}
            >
              <Callout>
                <Text>הזיזו אותי למיקום האחרון שראיתם בו את הכלב</Text>
              </Callout>
            </Marker>
          </MapView>
          <View style={styles.addressView}>
            <EntypoIcon name="location-pin" size={21} color="#808080" />
            <Text style={styles.addressText}>{address}</Text>
          </View>

          <View style={styles.bottomView}>
            <View style={{ marginRight: "1%" }}>
              <Icon name="infocirlceo" size={18} color="#000" />
            </View>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>
                ניתן להזיז את הסמן באמצעות לחיצה ארוכה
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={nextScreen} style={styles.proceedButton}>
            <Text style={Nofar_styles.TinyButtonTitle}>המשך</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
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
    zIndex: -10,
    marginBottom: "2.5%",
    // width: Dimensions.get("window").width / 1.12,
    width: "90%",
    height: "76%",
    justifyContent: "center",
    alignSelf: "center",
    //height: Dimensions.get("window").height / 1.6,
    marginTop: "2.5%",
    marginHorizontal: "2.5%",
  },
  bottomTextView: {
    flexDirection: "row",
  },
  bottomText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  addressText: {
    color: "#808080",
    fontSize: 17.5,
    fontWeight: "500",
  },
  bottomView: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: "1.5%",
    alignItems: "center",
  },
  proceedButton: {
    paddingVertical: "3%",
    paddingRight: "5%",
    paddingLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#DCA277",
    marginVertical: "2%",
    width: Dimensions.get("window").width / 2.2,
    marginLeft:
      (Dimensions.get("window").width - Dimensions.get("window").width / 1.12) /
      2,
  },
  addressView: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginLeft: "1%",
    marginRight: "12%",
    borderRadius: 20,
    marginVertical: "1.5%",
    alignItems: "center",
    position: "absolute",
    top: 400,
    backgroundColor: "#FFF",
  },
});
