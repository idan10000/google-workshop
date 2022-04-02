import React from 'react';
import {
    Modal,
    Portal,
    Text,
    Button,
    Provider,
    Card,
    Chip,
    Searchbar,
    Divider,
    IconButton,
    Menu,
    

} from 'react-native-paper';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native'
import NewReportFAB from '../shared_components/newReportFAB';
import Poster from '../data_classes/poster'
import PostListItem from '../shared_components/postListItem'


const BrowseReports = ({navigation}) => {

    var tempPosters = [
        {poster: new Poster('https://picsum.photos/700/500', 100, "10/10/2022", "", "", ""), key: '1'},
        {poster: new Poster('https://picsum.photos/500/400', 100, "10/10/2022", "", "", ""), key: '4'},
        {poster: new Poster('https://picsum.photos/700/800', 100, "10/10/2022", "", "", ""), key: '3'},
        {poster: new Poster('https://picsum.photos/900/600', 100, "10/10/2022", "", "", ""), key: '2'},
        {poster: new Poster('https://picsum.photos/600/500', 100, "10/10/2022", "", "", ""), key: '5'},
        {poster: new Poster('https://picsum.photos/300/500', 100, "10/10/2022", "", "", ""), key: '6'},

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
                    <Menu.Item onPress={() => {
                    }} title="Item 2"/>
                    <Divider/>
                    <Menu.Item onPress={() => {
                    }} title="Item 3"/>
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
                        // <Image
                        //     source={{uri: item.poster.image}}
                        //     style={styles.image}
                        // />
                    )
                }}/>

            </View>
            <NewReportFAB/>
        </Provider>
    )

};

const styles = StyleSheet.create({
    tabContainer: {
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    searchBarContainer: {
        flexDirection: 'row'
    },
    filterButton: {
        position: "absolute",
        right: 16,
        zIndex: 2
    },
    Search: {
        flex: 1,
        paddingRight: 16,
        zIndex: 1
    },
    listContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    image: {
        width:Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
        resizeMode: "cover"
    }

});


export default BrowseReports;
