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
    Title,
    Paragraph,
    Avatar
} from 'react-native-paper';
import {View, StyleSheet, FlatList,} from 'react-native'


const BrowsePage = () => {


    const [posters, setPosters] = React.useState([{temp:1},{temp:2}]);

    const [visibleSortMenu, setVisibleSortMenu] = React.useState(false);

    const openSortMenu = () => setVisibleSortMenu(true);
    const closeSortMenu = () => setVisibleSortMenu(false);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder"/>

    return (
        <Provider>
            <View style={styles.tabContainer}>
                {/*tab switching */}

                <Button onPress={() => console.log("press")} compact={true}>Posters</Button>
                <Divider style={{width: 1, height: '80%'}}/>
                <Button onPress={() => console.log("press")} compact={true}>Reports</Button>

            </View>
            <View style={styles.searchBarContainer}>
                {/* search bar + sort + filter*/}

                <Menu
                    visible={visibleSortMenu}
                    onDismiss={closeSortMenu}
                    anchor={<IconButton
                        icon={"sort"}
                        onPress={openSortMenu}/>}>
                    <Menu.Item onPress={() => {
                    }} title="Item 1"/>
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
            <View>
                {/* List */}
                {/*<FlatList data={posters} renderItem={() => ()}/>*/}

            </View>

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
        zIndex:2
    },
    Search: {
        flex: 1,
        paddingRight: 16,
        zIndex:1
    }

});


export default BrowsePage;
