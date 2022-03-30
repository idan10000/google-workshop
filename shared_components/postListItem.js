import * as React from 'react';
import {Text, Button, Provider, Card, Chip, Headline, FAB, TextInput, Divider, Caption} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image, I18nManager} from 'react-native'
import PosterPostingComponent from "../screens/post_poster_screen";


const postListItem = ({image, date, distance, pressHandler}) => {

    console.log({uri: image})
    return (
        <Provider>
            <View style={styles.itemContainer}>
                <View style={styles.detailsContainer}>
                    <Caption style={styles.date}>{date}</Caption>
                    <Caption style={styles.distance}>{distance} מטרים ממך</Caption>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                </View>

            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height:200,
        width: 140,
        marginBottom:30,
    },
    image: {
        resizeMode: "stretch",
        flex:1,
        borderRadius:20,


    },
    detailsContainer: {
        paddingHorizontal:6,

    },

    itemContainer: {
        marginTop:300,
        marginHorizontal:30,
        borderWidth:2,
        flexDirection:"row",
        borderColor: "red",
        alignItems: 'center',
        height:90,
        width:180,
        borderRadius:15,


    }


})

export default postListItem;
