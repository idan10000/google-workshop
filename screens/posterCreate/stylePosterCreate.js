import { StyleSheet, Dimensions } from "react-native";

export const stylesPoster = StyleSheet.create({
  chips: {
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    paddingHorizontal:"5%"
  },
  modal: {
    backgroundColor:"#BBB988",
    padding: 20,
  },
  addImageContainer: {
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
    height: Dimensions.get("window").height / 2,
  },
  addImageText: {
    textAlign: "center",
    fontSize: 24,
  },
  pictureContainer: {
    flex: 3,
    justifyContent: "center",
    alignContent: "center",
    height: Dimensions.get("window").height / 2,
  },
  card: {
    resizeMode: "contain",
    flex: 1,
  },
  modalButtonContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  modalButton: {},
  fabContainer: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor:"#816A55",

  },
  descriptionContainer: {},
  addTagsBTContainer: {
    paddingVertical:"5%",
    flexDirection:"row",
    paddingHorizontal:"5%",
    justifyContent:"space-around"
  },
  locationBTContainer: {
    paddingBottom:"5%",
    flexDirection:"row",
    paddingHorizontal:"5%"
  },
  confirmBTContainer:{
    alignSelf:"center",
    paddingBottom:"5%"
  }

});
