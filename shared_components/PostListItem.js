import * as React from "react";
import {
  Provider,
  Caption,
} from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

const postListItem = ({ image, date, distance, data, destination, navigation}) => {
  console.log(distance)
  return (
    <TouchableOpacity onPress={() => {navigation.navigate(destination, {data: data})}}>
      <Provider>
        <View style={styles.itemContainer}>
          {/*<View style={styles.imageContainer}>*/}
          <Image source={{ uri: image }} style={styles.image} />
          {/*</View>*/}
          <View style={styles.detailsContainer}>
            <Caption style={styles.date}>{date}</Caption>

            <Caption style={styles.distance}>{distance.toFixed(2)} ק"מ</Caption>
          </View>
        </View>
      </Provider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    flex: 1,
    width: Dimensions.get("window").width / 2.2,
    height: Dimensions.get("window").height / 3,
  },
  detailsContainer: {
    paddingHorizontal: 4,
    marginTop: -4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemContainer: {
    flexDirection: "column",
    borderColor: "black",
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  date:{
    color:"black",
    fontWeight:"bold"
  },
  distance:{
    color:"black",
    fontWeight:"bold"
  }
});

export default postListItem;
