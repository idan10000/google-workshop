import * as React from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity, Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, {
    Callout,
    Marker,
} from "react-native-maps";
import {useEffect, useState} from "react";
import {
    doc,
    getDoc,
    getDocs,
    getFirestore,
    collection, query, orderBy, limit, startAt, endAt,
} from "firebase/firestore";
import {geohashQueryBounds} from "geofire-common";
import {fireStoreDB} from "../../shared_components/Firebase";
import {Provider, Portal, Modal} from "react-native-paper";
import {Nofar_styles} from "../../styles/NofarStyle";
import {stylesPoster} from "../CreatePoster/CreatePosterStyle";
import Icon from "react-native-vector-icons/Entypo";
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function Map({navigation}) {
    const sheetRef = React.useRef(null);
    // user live location :
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const calc_distance = (lat1, lat2) => {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) / 2;

        return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
    const getCloseDocuments = async () => {
        const bounds = geohashQueryBounds([region.latitude, region.longitude],
            calc_distance(region.latitude - region.latitudeDelta, region.latitude + region.latitudeDelta));
        const promises = [];
        for (const b of bounds) {
            const q = query(collection(fireStoreDB, "Reports"), orderBy('location.geohash'),
                startAt(b[0]), endAt(b[1]));

            promises.push(getDocs(q));
        }


        // Collect all the query results together into a single list
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
                for (const doc of snap.docs) {

                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match


                    let obj = doc.data();
                    let pair = {key: doc.id};
                    obj = {...obj, pair};
                    matchingDocs.push(obj);

                }
            }

            setData(matchingDocs)
        })
    }

    const mapInfoAlert = () =>
        Alert.alert(
            "",
            "הסמן האדום מייצג את מיקומך\nהסמנים הכחולים מייצגים מיקומים שבהם דווחו כלבים שנמצאו משוטטים. לחצו על הסמן לפרטים נוספים!",
            [
                {text: "הבנתי!", onPress: () => console.log("OK Pressed")}
            ]
        );

    const getAllReports = async () => {
        const db = getFirestore();
        const reports = [];
        const querySnapshot = await getDocs(collection(db, "Reports"));
        querySnapshot.forEach((doc) => {
            let obj = doc.data();
            let pair = {key: doc.id};
            obj = {...obj, pair};
            reports.push(obj);
        });
        setData(reports);
    };

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
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

            // set init display region
            setRegion({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121,
            })
            setIsLoading(false);
            await getCloseDocuments(); // new line
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

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
    });

    const [image, setImage] = useState(null)
    const [imageData, setImageData] = useState(null)
    const [visibleTag, setVisibleTag] = useState(false);
    const showTagModal = () => setVisibleTag(true);
    const hideTagModal = () => setVisibleTag(false);

    if (isLoading)
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large"/>
            </View>
        );


    return (
        <View style={{flex:1}}>
            <View>

                <MapView
                    style={styles.map}
                    initialRegion={region}
                    provider="google"
                    onRegionChangeComplete={(region) => {
                        setRegion(region)
                        getCloseDocuments()
                        console.log(region)
                    }}
                >
                    {data.map((marker) => (
                        <Marker
                            key={marker.pair.key}
                            coordinate={marker.location}
                            pinColor="blue"
                            draggable={false}
                            tracksViewChanges={false}
                            onPress={() => {
                                setImage(marker.image)
                                setImageData(marker)
                                showTagModal()
                            }}
                        >
                        </Marker>
                    ))}

                    <Marker coordinate={pin} pinColor="red" draggable={false}>
                        <Callout>
                            <Text>אתה כאן! </Text>
                        </Callout>
                    </Marker>
                </MapView>
                <Provider>
                    <Portal>
                        {/*Tags*/}
                        <Modal
                            visible={visibleTag}
                            onDismiss={hideTagModal}
                            contentContainerStyle={styles.modal}
                            onRequestClose={() => {
                                hideTagModal();
                            }}>

                            <TouchableOpacity onPress={() => {
                                hideTagModal()
                                navigation.navigate("Report", {data: imageData})}}>
                                <View style={{
                                    backgroundColor: "#F9F8F0",

                                    alignSelf: "center",
                                }}>
                            <Image
                                style={{

                                    height: Dimensions.get("window").height / 2.9,
                                    width: Dimensions.get("window").width / 1.9,
                                    alignSelf: "center",
                                }}
                                source={{uri: image}}
                                resizeMode="cover"/>
                                    {
                                        imageData != null &&
                                        <View alignSelf="center" flexDirection="column" alignItems="center">
                                            <View flexDirection="row">

                                            <Icon name="location-pin" size={22} color="#000"/>

                                            <Text>{imageData.address}</Text>
                                            </View>
                                            <Text>בתאריך:  {imageData.date}</Text>

                                        </View>}
                                </View>

                            </TouchableOpacity>
                        </Modal>
                    </Portal>
                </Provider>
                <View style={{position:"absolute",marginLeft:"80%", marginTop:"5%"}}>
                    <TouchableOpacity title={"2-Button Alert"} onPress={mapInfoAlert}>
                        <AntIcon name='infocirlce' size={22} color="#DCA277"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        calloutHeaderText: {
            fontSize: 14,
            fontWeight: "700",
        },
        map: {
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignSelf: "center",
            height: Dimensions.get("window").height / 1.2,
        },
        modal: {
            width: "50%",
            justifyContent: "center",
            alignSelf: "center",
            height: "50%",
        }
    });
