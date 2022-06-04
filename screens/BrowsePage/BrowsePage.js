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
    RefreshControl
} from 'react-native'
import PostListItem from '../../shared_components/PostListItem'
import {getInitialData, getNextData} from "./InfiniteScroll"
import {getCurrentPositionAsync, requestForegroundPermissionsAsync} from "expo-location";
import {geohashForLocation} from "geofire-common";

const BrowsePage = ({navigation, route}) => {
    const {collectionPath, destination} = route.params

    const getInitialLocation = async () => {
        console.log("getting initial location")
        let {status} = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let newLocation = await getCurrentPositionAsync({});
        const coords = [newLocation.coords.latitude, newLocation.coords.longitude]
        setInitialLocation(coords)
        const hash = geohashForLocation([newLocation.coords.latitude, newLocation.coords.longitude])
        setGeohash(hash)

        return [newLocation.coords.latitude, newLocation.coords.longitude]
    }

    const [initialLocation, setInitialLocation] = useState(null)
    const [geohash, setGeohash] = useState(null)

    const [sortType, setSortType] = useState(["date", "desc"]);

    const sortByDate = () => (
        setSortType(["date", "desc"])
    )

    const sortByDistance = () => (
        setSortType(["location.geohash", "asc", geohash])
    )

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
        await getInitialData(setData, collectionPath, loc, sortType);
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
        getInitialData(setData, collectionPath, initialLocation, sortType).then(() => {
            setRefreshing(false);
            console.log("Finished refreshing")
        });
    }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../../assets/new_background.png')}>
            <Provider>
                <View style={{
                    flexWrap: "wrap", flexDirection: 'row',
                    // borderWidth:0.5,borderColor:"#000",
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {/* search bar + sort + filter*/}

                    <Menu
                        visible={visibleSortMenu}
                        onDismiss={closeSortMenu}
                        anchor={<IconButton
                            icon={"sort"}
                            onPress={openSortMenu}
                        />}>
                        <Menu.Item onPress={() => {
                            sortByDate()
                        }} title="תאריך"/>
                    </Menu>


                    <View style={styles.Search}>
                        <Text style={styles.textSort}>מיון לפי:</Text>
                    </View>


                </View>
                <View style={styles.listContainer}>
                    <FlatList data={data.docs}
                              ItemSeparatorComponent={FlatListItemSeparator}
                              keyExtractor={(item) => item.image}
                              onEndReached={() => getNextData(data, setData, collectionPath, initialLocation, sortType)}
                              onEndReachedThreshold={0.5}
                              refreshControl={
                                  <RefreshControl refreshing={refreshing} onRefresh={refreshItems}/>
                              }
                              numColumns={2}
                              renderItem={({item}) => {
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
                              }}/>

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
        flex: 1,
        zIndex: 1,

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
        fontWeight: "700",
    }

});


export default BrowsePage;
