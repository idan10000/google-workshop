import { StyleSheet, Dimensions } from "react-native";

export const stylesPoster = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 8,
    flex: 1,
  },
  chips: {
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    paddingTop: 16,
  },
  modal: {
    backgroundColor: "white",
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
  },
  descriptionContainer: {},
  addTagsBT: {},
});
