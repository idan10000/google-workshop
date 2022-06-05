import React, {useEffect, useState} from 'react';
import {
    Provider,
    IconButton,
    Menu,
} from 'react-native-paper';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ImageBackground,
    Text,
    RefreshControl,
    TouchableOpacity,
    Alert
} from 'react-native'
import PostListItem from '../../shared_components/PostListItem'
import {getInitialData, getNextData} from "./InfiniteScroll"
import {getCurrentPositionAsync, requestForegroundPermissionsAsync} from "expo-location";
import {distanceBetween, geohashForLocation, geohashQueryBounds} from "geofire-common";
import RadioGroup from "react-native-radio-button-group";
import Icon from 'react-native-vector-icons/AntDesign';
import {collection, limit, orderBy, query, startAt, endAt, getDocs} from "firebase/firestore";
import {fireStoreDB} from "../../shared_components/Firebase";

const BrowsePage = ({navigation, route}) => {
    const {collectionPath, destination} = route.params
    const radius = 10000

    const getInitialLocation = async () => {
        console.log("getting initial location")
        let {status} = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let newLocation = await getCurrentPositionAsync({});
        const coords = [newLocation.coords.latitude, newLocation.coords.longitude]
        setInitialLocation(coords)
        return [newLocation.coords.latitude, newLocation.coords.longitude]
    }

    const [initialLocation, setInitialLocation] = useState(null)

    const [sortType, setSortType] = useState(true);
    const [distanceDocs, setDistanceDocs] = useState(null);
    const sortByDate = () => (
        setSortType(true)
    )

    const sortByDistance = async () => {
        if (distanceDocs === null) {
            await getCloseDocuments()
        }
        setSortType(false)
    }

    const getCloseDocuments = async () => {
        const bounds = geohashQueryBounds(initialLocation, radius);
        const promises = [];
        for (const b of bounds) {
            const q = query(collection(fireStoreDB, collectionPath), orderBy('location.geohash'), limit(30),
                startAt(b[0]), endAt(b[1]));

            promises.push(getDocs(q));
        }

// Collect all the query results together into a single list
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('location.latitude');
                    const lng = doc.get('location.longitude');

                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = distanceBetween([lat, lng], initialLocation);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radius) {
                        matchingDocs.push(doc);
                    }
                }
            }

            return matchingDocs;
        }).then((matchingDocs) => {
            let docs = []
            matchingDocs.forEach((e) => {
                const data = e.data()
                const dist = distanceBetween([data.location.latitude, data.location.longitude], initialLocation)
                docs.push({...data, distance: dist})
            })
            docs.sort((a, b) => {
                return a.distance > b.distance
            })
            setDistanceDocs(docs)
        })
    }

    const [visibleSortMenu, setVisibleSortMenu] = useState(false);

    const openSortMenu = () => setVisibleSortMenu(true);
    const closeSortMenu = () => setVisibleSortMenu(false);

    var FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }


    //---------------------- Infinite Scrolling ----------------------

    const [data, setData] = useState({
        docs: [], error: null, lastDocId: null,
        initialBatchStatus: "",
        nextBatchStatus: "",
    })


    useEffect(async () => {
        // Load initial batch documents when main component mounted.
        const loc = await getInitialLocation()
        await getInitialData(setData, collectionPath, loc);
        setRefreshing(false);
    }, []);


    const renderLoadingIndicator = () => {
        return (

            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>


                <ActivityIndicator color="#000" size="large"/>

            </View>
        )
    }

    //---------------------- Refresh ----------------------
    const [refreshing, setRefreshing] = useState(true);

    const refreshItems = () => {
        console.log("start refreshing")
        getInitialData(setData, collectionPath, initialLocation).then(() => {
            setRefreshing(false);
            console.log("Finished refreshing")
        });
    }

    const refreshDistanceItems = () => {
        console.log("start refreshing")
        getCloseDocuments().then(() => {
            setRefreshing(false);
            console.log("Finished refreshing")
        });
    }

    //
    // const radiogroup_options = [
    //     {id: 0, label: 'Button1' },
    //     {id: 1, label: 'Button2' },
    //
    // ];
    // const [selectedOption, setSelectedOption] = useState(1)

    const [selectedDate, setSelectedDate] = useState(true)
    const [selectedDis, setSelectedDis] = useState(false)

    const handleDatePress = () => {
        // navigation.pop()
        if (!selectedDate) {
            setSelectedDate(true)
            setSelectedDis(false)
            sortByDate()
        }
    }
    const handleDisPress = async () => {
        if (!selectedDis) {
            setSelectedDate(false)
            setSelectedDis(true)
            await sortByDistance()
        }
    }


    const createTwoButtonAlert = () =>
        Alert.alert(
            "",
            "מרחק החיפוש מוגבל ברדיוס מסוים",
            [

                {text: "הבנתי!", onPress: () => console.log("OK Pressed")}
            ]
        );


    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../../assets/new_background.png')}>
            <Provider>
                <View style={{
                    flexWrap: "wrap", flexDirection: 'row',
                    // borderWidth:0.5,borderColor:"#000",
                    marginVertical: '2.5%', alignItems: 'center',
                    marginLeft: "5%",
                }}>

                    <View style={styles.Search}>
                        <Text style={styles.textSort}>מיון לפי:</Text>
                    </View>

                    {selectedDate &&
                        <View style={styles.dateView}>
                            <TouchableOpacity onPress={handleDatePress}>
                                <Text style={styles.dateText}>תאריך</Text>
                            </TouchableOpacity>
                        </View>}

                    {!selectedDate &&
                        <View style={styles.notDateView}>
                            <TouchableOpacity onPress={handleDatePress}>
                                <Text style={styles.notDateText}>תאריך</Text>
                            </TouchableOpacity>
                        </View>}


                    <View style={styles.sepreator}>
                        <Text style={styles.seperateText}>/</Text></View>

                    {selectedDis &&
                        <View style={styles.dateView}>
                            <TouchableOpacity onPress={handleDisPress}>
                                <Text style={styles.dateText}>מרחק</Text>
                            </TouchableOpacity>
                        </View>}
                    {!selectedDis &&
                        <View style={styles.notDateView}>
                            <TouchableOpacity onPress={handleDisPress}>
                                <Text style={styles.notDateText}>מרחק</Text>
                            </TouchableOpacity>
                        </View>}


                    <View marginLeft="13%">
                        <TouchableOpacity title={"2-Button Alert"} onPress={createTwoButtonAlert}>
                            <Icon name='infocirlce' size={28} color="#DCA277"/>
                        </TouchableOpacity>

                    </View>


                </View>
                <View style={styles.listContainer}>
                    {sortType &&
                        <FlatList data={data.docs}
                                  ItemSeparatorComponent={FlatListItemSeparator}
                                  keyExtractor={(item) => item.image}
                                  onEndReached={() => getNextData(data, setData, collectionPath, initialLocation)}
                                  onEndReachedThreshold={0.5}
                                  refreshControl={
                                      <RefreshControl refreshing={refreshing} onRefresh={refreshItems}/>
                                  }
                                  numColumns={2}
                                  renderItem={({item}) => {
                                      console.log(item)
                                      return (
                                          <View style={{paddingVertical: 5}}>
                                              <PostListItem
                                                  image={item.image}
                                                  date={item.date}
                                                  distance={item.distance}
                                                  data={item}
                                                  navigation={navigation}
                                                  destination={destination}
                                              /></View>
                                      )
                                  }}/>}

                    {!sortType &&
                        <FlatList data={distanceDocs}
                                  ItemSeparatorComponent={FlatListItemSeparator}
                                  keyExtractor={(item) => item.image}
                                  refreshControl={
                                      <RefreshControl refreshing={refreshing} onRefresh={refreshDistanceItems}/>
                                  }
                                  numColumns={2}
                                  renderItem={({item}) => {
                                      console.log(item)
                                      return (
                                          <View style={{paddingVertical: 5}}>
                                              <PostListItem
                                                  image={item.image}
                                                  date={item.date}
                                                  distance={item.distance}
                                                  data={item}
                                                  navigation={navigation}
                                                  destination={destination}
                                              /></View>
                                      )
                                  }}/>}


                </View>
            </Provider>
        </ImageBackground>
    )

};

const styles = StyleSheet.create({
    tabContainer: {
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    searchBarContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: "#F9F8F0",
    },
    filterButton: {
        position: "absolute",
        right: 16,
        top: 10,
        zIndex: 2,
    },
    Search: {
        marginRight: "2.5%"
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
        resizeMode: "cover"
    },
    textSort: {

        fontSize: 16,
        fontWeight: "500",
    },
    dateText: {
        fontSize: 16,
        fontWeight: "700",
    },
    seperateText: {
        fontSize: 23,
        fontWeight: "500",
    },
    dateView: {
        borderRadius: 40,
        paddingVertical: "0.1%",

        paddingHorizontal: "4%",
        borderWidth: 2,
    },
    sepreator: {
        marginHorizontal: "3%",
    },
    notDateView: {
        borderRadius: 40,
        paddingVertical: "1%",

        paddingHorizontal: "4%",
        // borderWidth: 2,

    },
    notDateText: {
        fontSize: 16,
        fontWeight: "500",
    }


});


export default BrowsePage;
