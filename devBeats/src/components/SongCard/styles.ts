import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  artistTitle: {
    fontSize: 16,
    color: "#999",
  },
});
