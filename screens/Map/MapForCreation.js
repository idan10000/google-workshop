import * as React from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableOpacity, Keyboard,
} from "react-native";
import * as Location from "expo-location";
import MapView, {Callout, Marker} from "react-native-maps";
import {useEffect, useRef, useState} from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/AntDesign";
import {Nofar_styles} from "../../styles/NofarStyle";

export default function MapForCreation({
                                           preLocation,
                                           usePreLocation,
                                           location,
                                           setLocation,
                                           nextScreen
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
            setRegion({
                latitude: preLocation.coords.latitude,
                longitude: preLocation.coords.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0029,
            })
            setIsLoading(false);
        } else {
            (async () => {
                let {status} = await Location.requestForegroundPermissionsAsync();
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
                setRegion({
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    latitudeDelta: 0.0025,
                    longitudeDelta: 0.0029,
                })
                setIsLoading(false);
            })();
        }
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

    const [region, setRegion] = useState(null)
    const [showMap, setShowMap] = useState(true)

    const ref = useRef()
    if (isLoading) {
        return (
            <View style={styles.map}>
                <ActivityIndicator size="large" color="#DCA277"/>
            </View>
        );
    }
    return (
        <View style={{flex: 1}}>

            <View style={{flex: 1,
            marginLeft: "5%",
                marginRight: "5%"}}>
                <GooglePlacesAutocomplete
                    placeholder={"חפש כתובת (או סמן על המפה)"}
                    query={{
                        key: 'AIzaSyBOMIn1twPjZskW-EnIjfNaUcSVoiLRpqQ',
                        language: 'iw',
                        components: 'country:il'
                    }}
                    textInputProps={{
                        onFocus: () => {
                            setShowMap(false)
                        },
                        onBlur: () => {
                            setShowMap(true)
                        }
                    }}
                    ref={ref}
                    onPress={(data, details = null) => {
                        setShowMap(true)
                        let newLocation = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        }
                        setRegion({
                            ...newLocation,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        })
                        setPin(newLocation)
                        setLocation(newLocation)
                        console.log(data, details);
                    }}

                    fetchDetails={true}
                />
            </View>
            {showMap ? <View><MapView
                    style={styles.map}
                    onRegionChangeComplete={(region) => {
                        setRegion(region)
                    }}
                    region={region}
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
                            <Text>הזיזו אותי למיקום האחרון שראיתם בו את הכלב</Text>
                        </Callout>
                    </Marker>
                </MapView>
                    <View style={styles.bottomView}>
                        <Icon name='infocirlceo' size={18} color="#000"/>
                        <View style={styles.bottomTextView}>
                            <Text style={styles.bottomText}>ניתן להזיז את הסמן באמצעות לחיצה ארוכה</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={nextScreen}
                        style={styles.proceedButton}>
                        <Text style={Nofar_styles.TinyButtonTitle}>המשך</Text>
                    </TouchableOpacity>
                </View>
                : <View/>}

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
        width: Dimensions.get("window").width / 1.12,
        justifyContent: "center",
        alignSelf: "center",
        height: Dimensions.get("window").height / 1.63,
    },
    bottomTextView: {
        flexDirection: "row",
        marginLeft: "2.5%"
    },
    bottomText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "600",
    },
    bottomView: {
        flexDirection: "row",
        marginHorizontal: "5%",
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
        marginLeft: (Dimensions.get("window").width - Dimensions.get("window").width / 1.12) / 2,
    },
});
