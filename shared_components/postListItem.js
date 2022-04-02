import * as React from "react";
import {
  Text,
  Button,
  Provider,
  Card,
  Chip,
  Headline,
  FAB,
  TextInput,
  Divider,
  Caption,
} from "react-native-paper";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  I18nManager,
  Dimensions,
} from "react-native";

const postListItem = ({ image, date, distance, report, navigation}) => {
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("Report", {report: report})}}>
      <Provider>
        <View style={styles.itemContainer}>
          {/*<View style={styles.imageContainer}>*/}
          <Image source={{ uri: image }} style={styles.image} />
          {/*</View>*/}
          <View style={styles.detailsContainer}>
            <Caption style={styles.date}>{date}</Caption>

            <Caption style={styles.distance}>{distance} מ'</Caption>
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
});

export default postListItem;
