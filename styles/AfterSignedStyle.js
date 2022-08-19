import { StyleSheet } from "react-native";

export const AfterSignedStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoheaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    width: 140,
    resizeMode: "stretch",
    marginLeft: 10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    margin: 8,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",

    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 800,
  },
  inform: {
    marginTop: 4,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
