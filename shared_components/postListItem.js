import * as React from 'react';
import {Text, Button, Provider, Card, Chip, Headline, FAB, TextInput, Divider, Caption} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image, I18nManager, Dimensions} from 'react-native'
import PosterPostingComponent from "../screens/post_poster_screen";


const postListItem = ({image, date, distance, pressHandler}) => {

    return (
        <Provider>
            <View style={styles.itemContainer}>

                {/*<View style={styles.imageContainer}>*/}
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                {/*</View>*/}
                <View style={styles.detailsContainer}>
                    <Caption style={styles.date}>{date}</Caption>
                    <Caption style={styles.distance}>{distance} מטרים ממך</Caption>
                </View>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex:1,
    },
    image: {
        resizeMode: "cover",
        flex:1,
        borderRadius:13,
        width:Dimensions.get('window').width / 2.2,
        height: Dimensions.get('window').width / 3

    },
    detailsContainer: {
        paddingHorizontal:6,

    },

    itemContainer: {
        borderWidth:2,
        flexDirection:"column",
        borderColor: "red",
        borderRadius:15,


    }


})

export default postListItem;
