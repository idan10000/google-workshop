import * as React from "react";
import { Provider, Caption } from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity, Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Touchable} from "react-native-web";
const deleteReport = (ref) => {
  Alert.alert(
      "",
      "האם אתה בטוח שאתה רוצה למחוק דיווח זה?",
      [
        {text: "כן", onPress:{deleteReportFromDB} }
      ]
  );
};

const deleteReportFromDB = (ref) => {
  Alert.alert(
      "",
      "האם אתה בטוח שאתה רוצה למחוק דיווח זה?",
      [

        {text: "כן!", onPress:{deleteReportFromDB} }
      ]
  );
};
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
          <View style={styles.cancelContainer}>

            <Caption style={styles.date}>{date}</Caption></View>
          <TouchableOpacity  onPress={deleteReport} >
            <Icon name="delete" color="#777777" size={25} /></TouchableOpacity>


          {destination != "Report" &&
          <Caption style={styles.date}>{name}</Caption>}
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
    paddingHorizontal: 10,
  },
  date: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  distance: {
    color: "black",
  }, cancelContainer: {
    position:"absolute",
    flexDirection: "row",
    alignItems:"center"

  }

});

export default PostProfileItem;
