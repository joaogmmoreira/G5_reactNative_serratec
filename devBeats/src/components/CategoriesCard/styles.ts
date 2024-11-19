import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#03A9F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 20,
    margin: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  image: {
    width: 35,
    height: 35,
    transform: [{ rotate: "30deg" }],
    borderRadius: 5,
    alignSelf: "flex-end",
  },
});
