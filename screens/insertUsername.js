import { ImageBackground } from "react-native";

export default function InsertUsername({ username, setUsername }) {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/new_background.png")}
    ></ImageBackground>
  );
}
