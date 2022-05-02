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
import {getDocuments} from "./infiniteScroll"

const BrowseReports = ({navigation}) => {


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
    /** Fetch initial batch docs and save last document ID */
    const getInitialData = async () => {
        console.log("getInitialData called")
        setData({ initialBatchStatus: "pending", error: null });
        const {
            docs,
            error,
            lastDocId,
            status: initialBatchStatus,
        } = await getDocuments({ lim: 4 });
        if (error) {
            console.log("error retrieving initial data: " + error)
            return setData({ initialBatchStatus, error });
        }
        return setData({ initialBatchStatus, docs, lastDocId });
    };

    useEffect(() => {
        // Load initial batch documents when main component mounted.
        getInitialData();
    }, []);


    /*
 * Fetch next batch of documents start from {lastDocId}
 */
    const getNextData = async () => {
        console.log(data)
        console.log("getting next data")
        // Discard next API call when there's pending request
        if (data.nextBatchStatus === "pending" || !data.lastDocId) return;

        console.log("before pending")

        setData({ ...data, nextBatchStatus: "pending", error: null });
        console.log("after pending")
        const {
            docs,
            error,
            lastDocId,
            status: nextBatchStatus,
        } = await getDocuments({ lim: 3, lastDocId: data.lastDocId });
        console.log("after getting docs")

        if (error) {
            console.log(error)
            return setData({ nextBatchStatus, error });
        }

        const newDocs = [...data.docs].concat(docs);
        setData({ ...data, nextBatchStatus, docs: newDocs, lastDocId });
    };

    const renderLoadingIndicator = ()=>{
        return (

            <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>


                <ActivityIndicator color="#000" size="large"/>

            </View>
        )
    }

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
                          keyExtractor={(item) => item.image.path}
                          onEndReached={getNextData}
                          onEndReachedThreshold={0.5}
                          numColumns={2}
                          renderItem={({item}) => {
                    return (
                        <View style={{paddingVertical:5}}>
                        <PostListItem
                            image={item.image.link}
                            date={item.date}
                            distance={item.location}
                            report={item}
                            navigation={navigation}
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


export default BrowseReports;
