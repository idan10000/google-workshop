import * as React from 'react';
import {Text, Button, Provider, Card, Chip, Headline, FAB, TextInput, Divider, Caption} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image, I18nManager} from 'react-native'
import PosterPostingComponent from "../screens/post_poster_screen";


const postListItem = ({image, date, distance, pressHandler}) => {

    console.log({uri: image})
    return (
        <Provider>
            {/*<View style={styles.itemContainer}>*/}
            <Caption style={styles.date}>תאריך:{date}</Caption>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>

                    <Caption style={styles.distance}>{distance} מטרים ממך</Caption>
                </View>
            {/*</View>*/}
        </Provider>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: "pink",
        height:"33%",
        width:"50%",
        marginRight:30
    },
    image: {
        resizeMode: "stretch",
        flex:1,
        paddingRight:30

    },
    detailsContainer: {},
    date: {
        paddingTop:30

    },
    distance: {},
    itemContainer: {
        borderWidth:1,
        flex:1
    }


})

export default postListItem;
