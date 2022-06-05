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
import {geohashForLocation} from "geofire-common";
import RadioGroup from "react-native-radio-button-group";
import Icon from 'react-native-vector-icons/AntDesign';

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
        if(selectedDate==false) {
            setSelectedDate(true)
            setSelectedDis(false)
        }
    }
        const handleDisPress = () => {
            if(selectedDis==false) {
                setSelectedDate(false)
                setSelectedDis(true)
            }
        }



    const createTwoButtonAlert = () =>
        Alert.alert(
            "",
            "מרחק החיפוש מוגבל ברדיוס מסוים",
            [

                { text: "הבנתי!", onPress: () => console.log("OK Pressed") }
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
                    marginLeft:"5%",
                }}>
                    {/* search bar + sort + filter*/}

                    {/*<Menu*/}
                    {/*    visible={visibleSortMenu}*/}
                    {/*    onDismiss={closeSortMenu}*/}
                    {/*    anchor={<IconButton*/}
                    {/*        icon={"sort"}*/}
                    {/*        onPress={openSortMenu}*/}
                    {/*    />}>*/}
                    {/*    <Menu.Item onPress={() => {*/}
                    {/*        sortByDate()*/}
                    {/*    }} title="תאריך"/>*/}
                    {/*</Menu>*/}

                    {/*<View>*/}
                    {/*    <RadioGroup*/}
                    {/*        horizontal*/}
                    {/*        options={radiogroup_options}*/}
                    {/*        onChange={(option) => setSelectedOption(option)}*/}
                    {/*    />*/}
                    {/*</View>*/}



                    <View style={styles.Search}>
                        <Text style={styles.textSort}>מיון לפי:</Text>
                    </View>

                    {selectedDate &&
                    <View style = {styles.dateView}>
                        <TouchableOpacity onPress={handleDatePress}>
                            <Text style = {styles.dateText}>תאריך</Text>
                        </TouchableOpacity>
                    </View>}

                    {!selectedDate &&
                        <View style = {styles.notDateView}>
                            <TouchableOpacity onPress={handleDatePress}>
                                <Text style = {styles.notDateText}>תאריך</Text>
                            </TouchableOpacity>
                        </View>}


                        <View style = {styles.sepreator}>
                        <Text style = {styles.seperateText}>/</Text></View>

                    {selectedDis &&
                    <View style = {styles.dateView}>
                        <TouchableOpacity onPress={handleDisPress}>
                            <Text style = {styles.dateText}>מרחק</Text>
                        </TouchableOpacity>
                    </View>}
                    {!selectedDis &&
                        <View style = {styles.notDateView}>
                            <TouchableOpacity onPress={handleDisPress}>
                                <Text style = {styles.notDateText}>מרחק</Text>
                            </TouchableOpacity>
                        </View>}


                    <View marginLeft="13%">
                        <TouchableOpacity title={"2-Button Alert"} onPress={createTwoButtonAlert}>
                            <Icon name = 'infocirlce' size={28} color ="#DCA277" />
                            </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                        {/*    title={"3-Button Alert"}*/}
                        {/*    onPress={createThreeButtonAlert}*/}
                        {/*/>*/}
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
        borderRadius:40,
        paddingVertical: "0.1%",

        paddingHorizontal: "4%",
         borderWidth: 2,
    },
    sepreator: {
        marginHorizontal:"3%",
    },
    notDateView: {
        borderRadius:40,
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
