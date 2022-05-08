import React, {useEffect, useState} from 'react';
import {
    Provider,
    Searchbar,
    IconButton,
    Menu,
} from 'react-native-paper';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native'
import PostListItem from '../../shared_components/postListItem'
import Report from "../../data_classes/report";
import {addDoc, arrayUnion, collection, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {getDocuments, getInitialData, getNextData} from "./infiniteScroll"

const BrowsePage = ({navigation, route}) => {
    const {collectionPath, destination} = route.params

    const sortByDate = () => (
        setData((prevData) => (
                prevData.sort((a, b) => a.date.localeCompare(b.date))
            )
        )
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

    const [data,setData] = useState({
        docs:[],error:null,lastDocId:null,
        initialBatchStatus:"",
        nextBatchStatus:"",
    })


    useEffect(() => {
        // Load initial batch documents when main component mounted.
        getInitialData(setData, collectionPath);
    }, []);


    const renderLoadingIndicator = ()=>{
        return (

            <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>


                <ActivityIndicator color="#000" size="large"/>

            </View>
        )
    }
    console.log(collectionPath)
    console.log(data.docs)
    return (
        <Provider>
            <View style={styles.searchBarContainer}>
                {/* search bar + sort + filter*/}

                <Menu
                    visible={visibleSortMenu}
                    onDismiss={closeSortMenu}
                    anchor={<IconButton
                        icon={"sort"}
                        onPress={openSortMenu}/>}>
                    <Menu.Item onPress={() => {sortByDate()}} title="תאריך"/>
                </Menu>

                <View style={styles.Search}>
                    <Searchbar>
                    </Searchbar>
                </View>

                <IconButton
                    icon={"filter"}
                    style={styles.filterButton}
                    onPress={() => console.log("filter")}
                />


            </View>
            <View style={styles.listContainer}>
                {/* List */}
                <FlatList data={data.docs}
                          ItemSeparatorComponent={FlatListItemSeparator}
                          keyExtractor={(item) => item.image}
                          onEndReached={() => getNextData(data,setData,collectionPath)}
                          onEndReachedThreshold={0.5}
                          numColumns={2}
                          renderItem={({item}) => {
                              console.log(item.image)
                    return (
                        <View style={{paddingVertical:5}}>
                        <PostListItem
                            image={item.image}
                            date={item.date}
                            distance={item.location}
                            data={item}
                            navigation={navigation}
                            destination={destination}
                        /></View>
                    )
                }}/>

            </View>
            {/* <NewReportFAB/> */}
        </Provider>
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
        backgroundColor: "#BBB988",
    },
    filterButton: {
        position: "absolute",
        right: 16,
        top:10,
        zIndex: 2,
    },
    Search: {
        flex: 1,
        paddingRight: 16,
        zIndex: 1,

    },
    listContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#BBB988",

    },
    image: {
        width:Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
        resizeMode: "cover"
    }

});


export default BrowsePage;
