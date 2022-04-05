import React from 'react';
import {
    Provider,
    Searchbar,
    IconButton,
    Menu,


} from 'react-native-paper';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native'
import PostListItem from '../shared_components/postListItem'
import Report from "../data_classes/report";


const BrowseReports = ({navigation}) => {

    var tempPosters = [
        {poster: new Report('https://www.rd.com/wp-content/uploads/2019/01/shutterstock_673465372.jpg?fit=700,467', 100, "10/10/2022", [{tag: "ביישן", state: false},{tag: "חברותי", state: false}], "תיאור לכלב",), key: '1'},
        {poster: new Report('https://i.pinimg.com/736x/b4/fd/0b/b4fd0bf7276d1f98064862b160459f01.jpg', 100, "10/10/2022", [{tag: "ביישן", state: false}], "",), key: '4'},
        {poster: new Report('https://lh3.googleusercontent.com/xCGq6z8ttJPLImoEYYChE57se-Lu2yVwQolx5HbAmaiOLfMf3wJjzz690LA4O402IyfTPuFaErY4lEBe93T9LU7LiMM=w640-h400-e365-rj-sc0x00ffffff', 100, "10/10/2022", [], "",), key: '3'},
        {poster: new Report('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVNU5QHQISeoWAO7EKcueW7X9JykV7vCF2iQ&usqp=CAU', 100, "10/10/2022", [], "",), key: '2'},


    ]
    const [posters, setPosters] = React.useState(tempPosters);

    const sortByDate = () => (
        setPosters((prevPosters) => (
                prevPosters.sort((a, b) => a.key.localeCompare(b.key))
            )
        )
    )

    const [visibleSortMenu, setVisibleSortMenu] = React.useState(false);

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
                <FlatList data={posters} ItemSeparatorComponent={FlatListItemSeparator} keyExtractor={(item) => item.key} numColumns={2} renderItem={({item}) => {
                    console.log(item.key)
                    return (
                        <View style={{paddingVertical:5}}>
                        <PostListItem
                            image={item.poster.image}
                            date={item.poster.date}
                            distance={item.poster.location}
                            report={item.poster}
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
