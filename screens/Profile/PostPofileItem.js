import * as React from "react";
import { Provider, Caption } from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const PostProfileItem = ({
  image,
  date,
  address,
  name,
  data,
  description,
  destination,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(destination, { data: data });
      }}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Caption style={styles.date}>{date}</Caption>
          <Caption style={styles.date}>{name}</Caption>
          <Caption style={styles.distance}>כתובת: {address}</Caption>
          <Caption style={styles.distance}>תיאור: {description}</Caption>
        </View>
      </View>
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
  },
  detailsContainer: {
    paddingHorizontal: 4,
    marginTop: -4,
    flexDirection: "column",
    width: "60%",
  },

  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  date: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  distance: {
    color: "black",
  },
});

export default PostProfileItem;
