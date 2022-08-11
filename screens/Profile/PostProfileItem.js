import * as React from "react";
import { Caption } from "react-native-paper";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { fireStoreDB } from "../../shared_components/Firebase";
import { useContext } from "react";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

const PostProfileItem = ({
  image,
  date,
  address,
  name,
  data,
  description,
  destination,
  navigation,
  id,
  refreshPosts,
}) => {
  const db = fireStoreDB;
  const { user } = useContext(AuthenticatedUserContext);

  const deletePostFromDB = async () => {
    await deleteDoc(doc(db, destination + "s", id));
    if (destination === "Poster") {
      await updateDoc(doc(db, "Users", user.uid), { posters: arrayRemove(id) });
    } else {
      await updateDoc(doc(db, "Users", user.uid), { reports: arrayRemove(id) });
    }
    await refreshPosts(destination + "s");
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          destination === "Poster" ? "AdPage" : "ReportPage",
          destination === "Poster"
            ? {
                data: data,
                poster: data,
                edit: true,
                ref: id,
              }
            : {
                data: data,
                report: data,
                edit: true,
                ref: id,
              }
        );
      }}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.cancelContainer}>
            <Caption style={styles.date}>{date}</Caption>
          </View>
          <TouchableOpacity
            onPress={() => {
              const message =
                destination === "Report"
                  ? "האם אתה בטוח שאתה רוצה למחוק דיווח זה? לא יהיה ניתן לשחזרו!"
                  : "האם אתה בטוח שאתה רוצה למחוק מודעה זאת? לא יהיה ניתן לשחזרה!";
              Alert.alert(
                "",
                message,
                [
                  {
                    text: "ביטול",
                    onPress: () => {},
                  },

                  {
                    text: "אישור",
                    onPress: deletePostFromDB,
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => {},
                }
              );
            }}
          >
            <Icon name="delete" color="#777777" size={25} />
          </TouchableOpacity>

          {destination !== "Report" && (
            <Caption style={styles.date}>{name}</Caption>
          )}
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
  },
  cancelContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostProfileItem;
